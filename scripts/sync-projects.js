import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPO_DIR = path.join(__dirname, '../projects_repository');
const PUBLIC_DIR = path.join(__dirname, '../public');
const DATA_DIR = path.join(__dirname, '../src/data/projects');

function sync() {
    console.log('--- Syncing Projects ---');

    if (!fs.existsSync(REPO_DIR)) {
        console.error('Projects repository not found!');
        return;
    }

    const projects = fs.readdirSync(REPO_DIR).filter(f => fs.lstatSync(path.join(REPO_DIR, f)).isDirectory());

    const itProjects = [];
    const enProjects = [];

    projects.forEach(projectId => {
        const projPath = path.join(REPO_DIR, projectId);
        const metaPath = path.join(projPath, 'meta.json');
        const itPath = path.join(projPath, 'it.json');
        const enPath = path.join(projPath, 'en.json');
        const coversPath = path.join(projPath, 'covers');
        const galleryPath = path.join(projPath, 'gallery');

        if (!fs.existsSync(metaPath)) {
            console.warn(`Skipping ${projectId}: meta.json missing`);
            return;
        }

        const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
        const itContent = fs.existsSync(itPath) ? JSON.parse(fs.readFileSync(itPath, 'utf8')) : {};
        const enContent = fs.existsSync(enPath) ? JSON.parse(fs.readFileSync(enPath, 'utf8')) : {};

        // 1. Prepare Public Folder
        const destPublic = path.join(PUBLIC_DIR, projectId);
        if (!fs.existsSync(destPublic)) fs.mkdirSync(destPublic, { recursive: true });

        // 2. Handle Covers
        let cover = '';
        let coverList = '';
        let coverPoints = '';

        if (fs.existsSync(coversPath)) {
            const coverFiles = fs.readdirSync(coversPath);
            coverFiles.forEach(file => {
                const ext = path.extname(file).toLowerCase();
                const name = path.basename(file, path.extname(file)).toLowerCase();
                const destFile = `cover_${file}`;

                fs.copyFileSync(path.join(coversPath, file), path.join(destPublic, destFile));

                if (name === 'list') coverList = destFile;

                // For points, prioritize SVG if it exists
                if (name === 'points') {
                    if (ext === '.svg' || !coverPoints) {
                        coverPoints = destFile;
                    }
                }

                if (name === 'cover' || (!cover && name !== 'list' && name !== 'points')) {
                    cover = destFile;
                }
            });
        }


        // Fallback for cover
        if (!cover && coverList) cover = coverList;
        if (!cover && coverPoints) cover = coverPoints;

        // 3. Handle Gallery
        const gallery = [];
        if (fs.existsSync(galleryPath)) {
            const galleryFiles = fs.readdirSync(galleryPath).filter(f => !f.startsWith('.'));
            galleryFiles.forEach(file => {
                fs.copyFileSync(path.join(galleryPath, file), path.join(destPublic, file));
                gallery.push(file);
            });
        }

        // 4. Build Project Objects
        const buildProj = (content) => ({
            id: projectId,
            cat: meta.cat || [],
            date: meta.date || "",
            place: meta.place || "",
            client: meta.client || "",
            title: content.title || "",
            subtitle: content.subtitle || "",
            description: content.description || "",
            images: {
                cover: cover,
                coverList: coverList || undefined,
                coverPoints: coverPoints || undefined,
                gallery: gallery
            },
            details: content.details || [],
            link: content.link || []
        });

        itProjects.push(buildProj(itContent));
        enProjects.push(buildProj(enContent));
    });

    // 5. Generate TS Files
    const itFileContent = `import { IProject } from "../../interfaces/IProject";\n\nexport const itProjects: IProject[] = ${JSON.stringify(itProjects, null, 4)};`;
    const enFileContent = `import { IProject } from "../../interfaces/IProject";\n\nexport const enProjects: IProject[] = ${JSON.stringify(enProjects, null, 4)};`;

    fs.writeFileSync(path.join(DATA_DIR, 'projects_it.ts'), itFileContent);
    fs.writeFileSync(path.join(DATA_DIR, 'projects_en.ts'), enFileContent);

    console.log(`Success: Synced ${projects.length} projects.`);
}

sync();
