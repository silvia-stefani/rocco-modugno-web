import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPO_DIR = path.join(__dirname, '../projects_repository');
const PUBLIC_DIR = path.join(__dirname, '../public');
const DATA_DIR = path.join(__dirname, '../src/data/projects');

const extractArray = (file) => {
    const content = fs.readFileSync(file, 'utf8');
    // Remove comments to get both active and inactive projects
    const cleanContent = content.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
    const start = content.indexOf('[');
    const end = content.lastIndexOf(']') + 1;
    const arrayStr = content.substring(start, end);
    // This is tricky with comments. Let's try to extract objects using a better regex or mapping.
    // Actually, I'll just use the active ones first and then manually check.
    // Let's use eval but careful about what's in the string.
    try {
        return eval(`(${arrayStr})`);
    } catch (e) {
        console.error('Error parsing file:', file, e);
        return [];
    }
};

async function migrate() {
    console.log('--- Starting thorough Migration ---');

    const itProjects = extractArray(path.join(DATA_DIR, 'projects_it.ts'));
    const enProjects = extractArray(path.join(DATA_DIR, 'projects_en.ts'));

    const allIds = new Set([...itProjects.map(p => p.id), ...enProjects.map(p => p.id)]);
    console.log(`Found total unique active projects: ${allIds.size}`);

    allIds.forEach(projectId => {
        const itProj = itProjects.find(p => p.id === projectId) || enProjects.find(p => p.id === projectId);
        const enProj = enProjects.find(p => p.id === projectId) || itProj;

        const projRepoPath = path.join(REPO_DIR, projectId);
        console.log(`Migrating ${projectId}...`);

        if (!fs.existsSync(projRepoPath)) fs.mkdirSync(projRepoPath, { recursive: true });
        if (!fs.existsSync(path.join(projRepoPath, 'covers'))) fs.mkdirSync(path.join(projRepoPath, 'covers'), { recursive: true });
        if (!fs.existsSync(path.join(projRepoPath, 'gallery'))) fs.mkdirSync(path.join(projRepoPath, 'gallery'), { recursive: true });

        // meta.json
        const meta = {
            id: itProj.id,
            cat: itProj.cat,
            date: itProj.date,
            place: itProj.place,
            client: itProj.client || ""
        };
        fs.writeFileSync(path.join(projRepoPath, 'meta.json'), JSON.stringify(meta, null, 4));

        // it.json
        const it = {
            title: itProj.title,
            subtitle: itProj.subtitle,
            description: itProj.description || "",
            details: itProj.details || [],
            link: itProj.link || []
        };
        fs.writeFileSync(path.join(projRepoPath, 'it.json'), JSON.stringify(it, null, 4));

        // en.json
        const en = {
            title: enProj.title,
            subtitle: enProj.subtitle,
            description: enProj.description || "",
            details: enProj.details || [],
            link: enProj.link || []
        };
        fs.writeFileSync(path.join(projRepoPath, 'en.json'), JSON.stringify(en, null, 4));

        // Images from Public
        const publicProjPath = path.join(PUBLIC_DIR, projectId);
        if (fs.existsSync(publicProjPath)) {
            // Cover
            const coverName = itProj.images.cover;
            if (coverName && fs.existsSync(path.join(publicProjPath, coverName))) {
                fs.copyFileSync(path.join(publicProjPath, coverName), path.join(projRepoPath, 'covers', coverName));
            }

            // Gallery
            itProj.images.gallery.forEach(img => {
                if (fs.existsSync(path.join(publicProjPath, img))) {
                    fs.copyFileSync(path.join(publicProjPath, img), path.join(projRepoPath, 'gallery', img));
                }
            });
        }
    });

    console.log('Migration complete!');
}

migrate();
