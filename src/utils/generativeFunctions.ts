
//FUNZIONI

export function simmetrica(string: string){
    const a=string.charAt(0);
    const b=string.charAt(1);
    const c=string.charAt(2);
    const d=string.charAt(3);
    
    const r1=a+b+sav(b)+sav(a)+a+b+sav(b)+sav(a);
    const r2=c+d+sav(d)+sav(c)+c+d+sav(d)+sav(c);
    const r3=sah(c)+sah(d)+sac(d)+sac(c)+sah(c)+sah(d)+sac(d)+sac(c);
    const r4=sah(a)+sah(b)+sac(b)+sac(a)+sah(a)+sah(b)+sac(b)+sac(a);
    const r5=a+b+sav(b)+sav(a)+a+b+sav(b)+sav(a);
    const r6=c+d+sav(d)+sav(c)+c+d+sav(d)+sav(c);
    const r7=sah(c)+sah(d)+sac(d)+sac(c)+sah(c)+sah(d)+sac(d)+sac(c);
    const r8=sah(a)+sah(b)+sac(b)+sac(a)+sah(a)+sah(b)+sac(b)+sac(a);
    
    const newString=r1+r2+r3+r4+r5+r6+r7+r8;
  
    return newString;  
    
  }
  
  
//Questa funzione viene usata? Penso si usi quella "ToDecimalTwo" che ho modificata per farla lavorare in base 4
export function toBase(num: number, classe: number) {
  const base = 4;
  let converted = num.toString(base);
  while (converted.length < classe) {
    converted = '0' + converted;
  }
  return converted;
}
  
export function matrix(string: string,l: number) {
  const array=[];
  for (let i=0; i<=string.length/l; i+=1) {
      const riga=string.substring(i*l, i*l+l);
        array.push(riga);
      
      //print(k);
    }
  
    return(array)
    }
  
  //FUNZIONE SIMMETRIA SU ASSE VERTICALE
  
export function sav(letter: string) {
    let newLetter='z';
    
    //modulo1
    if (letter=='0') {
      newLetter='3';
    }
      if (letter=='1') {
      newLetter='2';
    }
      if (letter=='2') {
      newLetter='1';
    }
      if (letter=='3') {
      newLetter='0';
    }
    
    //modulo2
      if (letter=='4') {
      newLetter='5';
    }
      if (letter=='5') {
      newLetter='4';
    }
    
  
    return newLetter;
  }
  
  //FUNZIONE SIMMETRIA SU ASSE ORIZZONTALE
export function sah(letter: string) {
    let newLetter='z';
    
    //modulo1
    if (letter=='0') {
      newLetter='1';
    }
      if (letter=='1') {
      newLetter='0';
    }
      if (letter=='2') {
      newLetter='3';
    }
      if (letter=='3') {
      newLetter='2';
    }
    
    //modulo2
      if (letter=='4') {
      newLetter='5';
    }
      if (letter=='5') {
      newLetter='4';
    }
    
    return newLetter;
  }
  
  
  //FUNZIONE SIMMETRIA SU ASSE CENTRALE
export function sac(letter: string) {
    let newLetter='z';
    
    //modulo1
    if (letter=='0') {
      newLetter='2';
    }
      if (letter=='1') {
      newLetter='3';
    }
      if (letter=='2') {
      newLetter='0';
    }
      if (letter=='3') {
      newLetter='1';
    }
    
    //modulo2
      if (letter=='4') {
      newLetter='4';
    }
      if (letter=='5') {
      newLetter='5';
    }
    
    return newLetter;
  }
