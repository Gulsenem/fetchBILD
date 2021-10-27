let bild = document.getElementById('bild');
let prozent = document.getElementById('prozent');

async function download()
{
    bild.src = "loading.jpg";
    bild.style.width = "50px";
    let antwort = await fetch("bild.jpg");
    let ergebnis = antwort.body.getReader();

    const dateiGrosse = +antwort.headers.get('Content-Length');

    let insgesamptGelesen = 0;
    let chunks = [];
    while(true)
    {
        const {done, value} = await ergebnis.read(); 

        
        if (done) {

            prozent.innerHTML= "";
            break;
          }
          
          insgesamptGelesen += value.length;
          let prz = Math.round((insgesamptGelesen *100)/dateiGrosse);
          prozent.innerHTML = prz + "%  ist geladen";
          
          chunks.push(value);
    }
    
    let blob = new Blob(chunks);
    let linkBild = URL.createObjectURL(blob);
    bild.style.width= "500px";
    bild.src = linkBild;
}
