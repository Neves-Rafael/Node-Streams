// Leitura em partes para arquivos muito grande

// 1gb - 1,000,000

// 10mb/s - 100s Tempo de espera para o arquivo total de 1 gb

// 10mb/s -> 10,000 Processamento enquanto o arquivo ainda está sendo enviado

// Readable Streams / Writable Streams

// process.stdin
//   .pipe(process.stdout)

import { Writable, Readable, Transform } from "node:stream";

class OneToHundredStream extends Readable {
  index = 1

  _read(){
    const i = this.index++;

    setTimeout(()=>{
      if( i > 10){
        this.push(null)
      }else{
        const buf = Buffer.from(String(i))
        this.push(buf)
      }
    },1000)
  }
}

new OneToHundredStream().pipe(process.stdout);