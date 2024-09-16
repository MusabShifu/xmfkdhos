Telegram.WebApp.ready();
let code = document.getElementById("code")
let startBtn = document.getElementById("start")
let gameIndex = 0;
startBtn.addEventListener('click', async () => {
    let v = code.value
    if (v.length == 6) {
        startBtn.className = 'clicked'
        let h3_anim = document.querySelector('#start + h3')
        h3_anim.className = 'clicked'
        let r = await fetch('https://raw.githubusercontent.com/MusabShifu/xmfkdhos/main/users.json')
        let dat = await r.json()
      const userIdList = dat["users"];
      if (userIdList.includes(Telegram.WebApp.initDataUnsafe.user.id)) {
        await alert(Telegram.WebApp.initDataUnsafe.user.id)
      
        let req = await fetch('https://raw.githubusercontent.com/MusabShifu/xmfkdhos/main/data/'+ v + '.json')
        let data = await req.json()
        load_game(data)
      }
      
  
    }

})
function load_game(data) {
    let demo = document.querySelector('.demo')
    demo.innerHTML = ''
    let counter = document.createElement('h1')
    counter.className = 'counter'
    demo.appendChild(counter)
    let co = 4
    let x =setInterval(() => {
        co -= 1
        if (co <= 0) {
            counter.innerHTML = "Go"
            counter.id = "Go"
        }
        else {

            counter.innerHTML = co
        }
        if (co == -1) {
            clearInterval(x) 
            counter.remove()
            start_game(demo ,data)
        }

    }, 1000);
    // start_game(demo, data)
}

function start_game(demo, data) {
    let prog = document.createElement('div')
    prog.className= 'prog'
    let progChild = document.createElement('div')
    progChild.className = 'child'
    prog.appendChild(progChild)
    demo.appendChild(prog)
    demo.id = 'more'
    let features = data['features']
    let n = 100/features.length;
    features.forEach((f,i) => {
        let box = document.createElement('div')
        box.className = 'feature-box'
        let num = document.createElement('p')
        num.id = 'num'
        num.innerHTML = i + 1
        let text = document.createElement('p')
        text.id = 'text'
        text.innerHTML = f
        box.appendChild(num)
        box.appendChild(text)
        demo.appendChild(box)
    });
    document.querySelector('.demo .feature-box').id = 'show-box'
    gameIndex = 1
    progChild.style.width = `${n * gameIndex}%`
    document.querySelector('.demo#more').addEventListener('click', (e) => {
        if (gameIndex != features.length) {
            document.querySelectorAll('.demo .feature-box')[gameIndex - 1].style.display = 'none'
            document.querySelectorAll('.demo .feature-box')[gameIndex].id = 'show-box'
        gameIndex++;
        progChild.style.width = `${n * gameIndex}%`
        if (gameIndex == features.length) {
            let endBtn = document.createElement('button')
            endBtn.innerHTML = 'Diagnosis'
            
            endBtn.addEventListener('click', () => {
                endBtn.id = ''
                setTimeout(() => {
                    endBtn.remove()
                    let dise = document.createElement('div')
                    dise.className = 'disease'
                    dise.innerHTML = data['disease']
                    demo.appendChild(dise)
                },500)
            })
        demo.appendChild(endBtn)
        setTimeout(() => {
                endBtn.id = 'end'
            }, 300)
        }
        }
    })
}
