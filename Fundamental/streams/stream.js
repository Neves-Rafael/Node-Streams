// Leitura em partes para arquivos muito grande

// 1gb - 1,000,000

// 10mb/s - 100s Tempo de espera para o arquivo total de 1 gb

// 10mb/s -> 10,000 Processamento enquanto o arquivo ainda está sendo enviado

// Readable Streams / Writable Streams

// process.stdin
//   .pipe(process.stdout)

import { Writable, Readable, Transform } from "node:stream";

//Stream de leitura
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

//Stream de escrita
class MultiplyByTenStream extends Writable{
  _write(chunk, encoding, callback){
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

//Stream de transformação
class InverseNumber extends Transform{
  _transform(chunk, encoding, callback){
    const inverse = Buffer.from(String(Number(chunk.toString()) * -1));
    callback(null, inverse)
  }
}

new OneToHundredStream()
  .pipe(new InverseNumber())
  .pipe(new MultiplyByTenStream());