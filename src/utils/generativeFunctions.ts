
//FUNZIONI

export function simmetrica(string: string){
    let a=string.charAt(0);
    let b=string.charAt(1);
    let c=string.charAt(2);
    let d=string.charAt(3);
    
    let r1=a+b+sav(b)+sav(a)+a+b+sav(b)+sav(a);
    let r2=c+d+sav(d)+sav(c)+c+d+sav(d)+sav(c);
    let r3=sah(c)+sah(d)+sac(d)+sac(c)+sah(c)+sah(d)+sac(d)+sac(c);
    let r4=sah(a)+sah(b)+sac(b)+sac(a)+sah(a)+sah(b)+sac(b)+sac(a);
    let r5=a+b+sav(b)+sav(a)+a+b+sav(b)+sav(a);
    let r6=c+d+sav(d)+sav(c)+c+d+sav(d)+sav(c);
    let r7=sah(c)+sah(d)+sac(d)+sac(c)+sah(c)+sah(d)+sac(d)+sac(c);
    let r8=sah(a)+sah(b)+sac(b)+sac(a)+sah(a)+sah(b)+sac(b)+sac(a);
    
    let newString=r1+r2+r3+r4+r5+r6+r7+r8;
  
    return newString;  
    
  }
  
  
  
export function toBase(num: number, n: number,k:number) {
    let numero=num;
    
    let a=numero.toString(n);
    
    if (a.length<=k) {
      let difetto=k-a.length;
      
    for (let i=0; i<difetto; i++) {
     a="0"+a;
    }}
    return a;
  }
  
export function matrix(string: string,l: number) {
  let array=[];
  for (let i=0; i<=string.length/l; i+=1) {
      let riga=string.substring(i*l, i*l+l);
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