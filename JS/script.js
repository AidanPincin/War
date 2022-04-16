const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
function drawRect(color,x,y,w,h){ctx.fillStyle=color;ctx.fillRect(x,y,w,h)}
function drawLine(color,x1,y1,x2,y2){ctx.strokeStyle=color;ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke()}
let x = 0
let y = 0
let mapOpen = false
class Txt{
    constructor(txt,x,y,fontsize=24,color='#000000'){
        this.txt = txt
        this.x = x
        this.y = y
        this.fontsize = fontsize
        this.color = color
    }
    drawOnSidePanal(){
        ctx.fillStyle = this.color
        ctx.font = this.fontsize+'px Arial'
        let width = ctx.measureText(this.txt).width
        ctx.fillText(this.txt,this.x-width/2,this.y+this.fontsize)
    }
    draw(){
        ctx.fillStyle = this.color
        ctx.font = this.fontsize+'px Arial'
        let width = ctx.measureText(this.txt).width
        let txt = this.txt
        let X = this.x
        if(X+width/2+x>800){
            txt = ''
        }
        ctx.fillText(txt,this.x-width/2+x,this.y+this.fontsize+y)
    }
    drawMiniMap(){
        ctx.fillStyle = this.color
        ctx.font = this.fontsize+'px Arial'
        const width = ctx.measureText(this.txt).width
        ctx.font = this.fontsize/12+'px Arial'
        const X = 875+(this.x+x-width/2)/12
        const Y = 75+(this.y+this.fontsize+y)/12
        ctx.fillText(this.txt,X,Y)
    }
    drawMap(){
        ctx.fillStyle = this.color
        ctx.font = this.fontsize+'px Arial'
        const width = ctx.measureText(this.txt).width
        ctx.font = this.fontsize/12+'px Arial'
        const X = 350+(this.x+x-width/2)/12
        const Y = 350+(this.y+this.fontsize+y)/12
        ctx.fillText(this.txt,X,Y)
    }
}
class Objct{
    constructor(x,y,width,height,color){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
    }
    draw(){
        let width = this.width
        if(this.x+x+width/2>800){
            width -= (this.x+x+this.width/2)-800
        }
        if(width<0){
            width=0
        }
        drawRect(this.color,this.x-this.width/2+x,this.y-this.height/2+y,width,this.height)
    }
    drawMiniMap(){
        const X = 875+(this.x-this.width/2+x)/12
        const Y = 75+(this.y-this.height/2+y)/12
        drawRect(this.color,X,Y,this.width/12,this.height/12)
    }
    drawMap(){
        const X = 350+(this.x-this.width/2+x)/12
        const Y = 350+(this.y-this.height/2+y)/12
        if (X>0 && X<800 && Y>0 && Y<800){drawRect(this.color,X,Y,this.width/12,this.height/12)}
    }
}
//My first ever, very own design :)!
//  ||
//  ||
//  \/
class Arrow{
    constructor(xspd,yspd,x,y,dmg,x1,y1){
        this.x = x+5
        this.y = y+5
        this.xspd = xspd
        this.yspd = yspd
        this.size = 25
        this.dmg = dmg
        this.x1 = x1
        this.y1 = y1

    }
    draw(){
        let x1_dif = this.x1-x
        let y1_dif = this.y1-y
        this.x1 -= x1_dif
        this.y1 -= y1_dif
        this.x += this.xspd-x1_dif
        this.y += this.yspd-y1_dif
        if (this.x>=0 && this.x<=800 && this.y>=0 && this.y<=800){
            // My very own design :) First ever!
            ctx.lineWidth = 5
            drawLine('#966f33',this.x,this.y,this.x+this.xspd*(this.size/player.arrowSpeed),this.y+this.yspd*(this.size/player.arrowSpeed))
            ctx.lineWidth = 1
            ctx.save()
            ctx.translate(this.x+this.xspd*((this.size+this.size/4)/player.arrowSpeed),this.y+this.yspd*((this.size+this.size/4)/player.arrowSpeed))
            ctx.rotate(Math.PI/6)
            ctx.beginPath()
            ctx.moveTo(0,0)
            ctx.lineTo(-this.xspd*((this.size/4)/player.arrowSpeed),-this.yspd*((this.size/4)/player.arrowSpeed))
            ctx.lineTo(0,0)
            ctx.rotate(-Math.PI/3)
            ctx.lineTo(-this.xspd*((this.size/4)/player.arrowSpeed),-this.yspd*((this.size/4)/player.arrowSpeed))
            ctx.restore()
            ctx.save()
            ctx.translate(this.x+this.xspd*((this.size)/player.arrowSpeed),this.y+this.yspd*((this.size)/player.arrowSpeed))
            ctx.rotate(Math.PI/2)
            ctx.lineTo(this.xspd*((this.size/6.66)/player.arrowSpeed),this.yspd*((this.size/6.66)/player.arrowSpeed))
            ctx.lineTo(-this.xspd*((this.size/6)/player.arrowSpeed),-this.yspd*((this.size/6)/player.arrowSpeed))
            ctx.fillStyle = 'silver'
            ctx.strokeStyle = 'silver'
            ctx.fill()
            ctx.stroke()
            ctx.restore()
            ctx.lineWidth = 1
            for (let i=0; i<(this.size/2-2); i++){
                ctx.save()
                ctx.translate(this.x+this.xspd*(((this.size/2)-i)/player.arrowSpeed),this.y+this.yspd*(((this.size/2)-i)/player.arrowSpeed))
                ctx.rotate(Math.PI/4)
                ctx.beginPath()
                ctx.moveTo(-this.xspd*((this.size/13.33)/player.arrowSpeed),-this.yspd*((this.size/13.33)/player.arrowSpeed))
                ctx.lineTo(-this.xspd*((this.size/2.66)/player.arrowSpeed),-this.yspd*((this.size/2.66)/player.arrowSpeed))
                ctx.rotate(-Math.PI/2)
                ctx.moveTo(-this.xspd*(3/player.arrowSpeed),-this.yspd*(3/player.arrowSpeed))
                ctx.lineTo(-this.xspd*((this.size/2.66)/player.arrowSpeed),-this.yspd*((this.size/2.66)/player.arrowSpeed))
                ctx.restore()
                ctx.strokeStyle = '#ff0000'
                ctx.stroke()
            }
            for (let i=0; i<enemyBases[0].enemys.length; i++){
                let hit = this.detectHit(enemyBases[0].enemys[i].x-20+x,enemyBases[0].enemys[i].y-20+y,40,40)
                console.log(hit)
                if(hit == true){
                    enemyBases[0].enemys[i].hp -= this.dmg
                    if(enemyBases[0].enemys[i].hp<=0){
                        enemyBases[0].enemys.splice(i,1)
                    }
                    return true
                }
            }
        }
        else{return true}
    }
    detectHit(x,y,width,height){
        const Height = this.size/4
        const Width = this.size/4
        if (this.x+Width+player.arrowSpeed>=x && this.x-player.arrowSpeed<=x+width && this.y+Height+player.arrowSpeed>=y && this.y-player.arrowSpeed<=y+height){
            return true
        }
    }
}
class Soilder{
    constructor(x,y){
        this.dmg = 5
        this.hp = 100
        this.max_hp = 100
        this.x = x
        this.y = y
        this.time = 0
    }
    draw(){
        const x_dist = (player.x-20)-(this.x-20+x)
        const y_dist = (player.y-20)-(this.y-20+y)
        const dist = Math.sqrt(Math.pow(x_dist,2)+Math.pow(y_dist,2))
        const enemyInRange = enemyBases[0].enemys.find(enemy => Math.sqrt(Math.pow((enemy.x-20+x)-(this.x-20+x),2)+Math.pow((enemy.y-20+y)-(this.y-20+y),2))<=Math.sqrt(320000))
        const allyCollision = player.army.find(ally => ally != this && Math.sqrt(Math.pow((ally.x-20+x)-(this.x-20+x),2)+Math.pow((ally.y-20+y)-(this.y-20+y),2))<=60)
        if (enemyInRange != undefined){
            const x_dif = (enemyInRange.x-20+x)-(this.x-20+x)
            const y_dif = (enemyInRange.y-20+y)-(this.y-20+y)
            const dif = Math.sqrt(Math.pow(x_dif,2)+Math.pow(y_dif,2))
            if (dif>60){
                if (allyCollision == undefined){
                    const xspd = (x_dif/dif)*10
                    const yspd = (y_dif/dif)*10
                    this.x += xspd
                    this.y += yspd
                }
                else{
                    const x_dist = (allyCollision.x-20)-(this.x-20)
                    const y_dist = (allyCollision.y-20)-(this.y-20)
                    const dist = Math.sqrt(Math.pow(x_dist,2)+Math.pow(y_dist,2))
                    const xspd = (x_dist/dist)*10
                    const yspd = (y_dist/dist)*10
                    this.x -= xspd
                    this.y -= yspd
                }
            }
            else{
                this.time += 1
                drawRect('#ffffff',this.x-20+x,this.y-50+y,40,5)
                drawRect('#0000ff',this.x-20+x,this.y-50+y,(this.time/60)*40,5)
                if (this.time>=60){
                    this.time = 0
                    enemyInRange.hp-=this.dmg
                    if (enemyInRange.hp<=0){
                        enemyBases[0].enemys.splice(enemyBases[0].enemys.indexOf(enemyInRange),1)
                    }
                }
            }
        }
        else if (dist>=350){
            if (allyCollision == undefined){
                const xspd = (x_dist/dist)*10
                const yspd = (y_dist/dist)*10
                this.x += xspd
                this.y += yspd
            }
            else{
                const x_dist = (allyCollision.x-20)-(this.x-20)
                const y_dist = (allyCollision.y-20)-(this.y-20)
                const dist = Math.sqrt(Math.pow(x_dist,2)+Math.pow(y_dist,2))
                const xspd = (x_dist/dist)*10
                const yspd = (y_dist/dist)*10
                this.x -= xspd
                this.y -= yspd
            }
        }
        drawRect('#00ff00',this.x-20+x,this.y-20+y,40,40)
        drawRect('#ffffff',this.x-20+x,this.y-40+y,40,10)
        drawRect('#ff0000',this.x-20+x,this.y-40+y,(this.hp/this.max_hp)*40,10)
    }
    drawMiniMap(){
        drawRect('#00ff00',875+(this.x-20+x)/12,75+(this.y-20+y)/12,40/12,40/12)
    }
}
class Player{
    constructor(){
        this.gps = 0
        this.population = 5
        this.max_population = 5
        this.fps = 0
        this.ufps = 2
        this.gold = 100
        this.food = 100
        this.armySize = 0
        this.armyCapacity = 20
        this.hp = 100
        this.max_hp = 100
        this.keys = ['w','s','a','d',' ']
        this.vars = ['up','down','left','right','attacking']
        this.x = 400
        this.y = 400
        this.arrows = []
        this.bowReload = 0
        this.arrowDmg = 50
        this.arrowSpeed = 15
        this.bowAttackSpeed = 5
        this.meleeDmg = 10
        this.meleeReload = 0
        this.meleeAttackSpeed = 1
        this.time = 0
        this.farms = [new Objct(200,600,100,50,'brown')]
        this.houses = [new Objct(600,600,200,200,'brown')]
        this.army = [new Soilder(300,300), new Soilder(400,300), new Soilder(500,300), new Soilder(300,400), new Soilder(500,400)]
    }
    draw(){
        this.armySize = this.army.length
        this.ufps = 2+this.army.length*2
        this.population = this.army.length
        for (let i=0; i<this.farms.length; i++){
            this.farms[i].draw()
        }
        for (let i=0; i<this.houses.length; i++){
            this.houses[i].draw()
        }
        this.fps = this.farms.length*10-this.ufps
        this.gps = this.houses.length
        if(this.time<60){
            this.time += 1
        }
        else{
            this.time = 0
            this.food += this.fps/10
            this.gold += this.gps/10
        }
        if(this.hp<0){this.hp=0}
        if(this.up == true){
            y+=10
            const enemyCollision = enemyBases[0].enemys.find(enemy => this.x+20>=enemy.x-20+x && this.x-20<=enemy.x+20+x && this.y+20>=enemy.y-20+y && this.y-20<=enemy.y+20+y)
            if(enemyCollision != undefined){
                y-=10
            }
        }
        if(this.down == true){
            y-=10
            const enemyCollision = enemyBases[0].enemys.find(enemy => this.x+20>=enemy.x-20+x && this.x-20<=enemy.x+20+x && this.y+20>=enemy.y-20+y && this.y-20<=enemy.y+20+y)
            if(enemyCollision != undefined){
                y+=10
            }
        }
        if(this.right == true){
            x-=10
            const enemyCollision = enemyBases[0].enemys.find(enemy => this.x+20>=enemy.x-20+x && this.x-20<=enemy.x+20+x && this.y+20>=enemy.y-20+y && this.y-20<=enemy.y+20+y)
            if(enemyCollision != undefined){
                x+=10
            }
        }
        if(this.left==true){
            x+=10
            const enemyCollision = enemyBases[0].enemys.find(enemy => this.x+20>=enemy.x-20+x && this.x-20<=enemy.x+20+x && this.y+20>=enemy.y-20+y && this.y-20<=enemy.y+20+y)
            if(enemyCollision != undefined){
                x-=10
            }
        }
        drawRect('#00ff00',this.x-20,this.y-20,40,40)
        for (let i=0; i<this.arrows.length; i++){
            let hit = this.arrows[i].draw()
            if (hit == true){
                this.arrows.splice(i,1)
            }
        }
        ctx.beginPath()
        ctx.strokeStyle = '#ff0000'
        ctx.arc(this.mouseX,this.mouseY,10,0,Math.PI*2,false)
        ctx.stroke()
        drawLine('#ff0000',this.mouseX+5,this.mouseY,this.mouseX+15,this.mouseY)
        drawLine('#ff0000',this.mouseX-5,this.mouseY,this.mouseX-15,this.mouseY)
        drawLine('#ff0000',this.mouseX,this.mouseY-5,this.mouseX,this.mouseY-15)
        drawLine('#ff0000',this.mouseX,this.mouseY+5,this.mouseX,this.mouseY+15)
        if (this.reloading==true){
            this.bowReload += 1
            drawRect('#ffffff',this.x-20,this.y-50,40,5)
            drawRect('#0000ff',this.x-20,this.y-50,(this.bowReload/(60*this.bowAttackSpeed))*40,5)
            if(this.bowReload>=60*this.bowAttackSpeed){
                const x_dif = (this.mouseX-5)-this.x
                const y_dif = (this.mouseY-5)-this.y
                const sum = Math.sqrt(Math.pow(x_dif,2)+Math.pow(y_dif,2))
                const xspd = (x_dif/sum)*this.arrowSpeed
                const yspd = (y_dif/sum)*this.arrowSpeed
                this.arrows.push(new Arrow(xspd,yspd,this.x,this.y,this.arrowDmg,x,y))
                this.bowReload = 0
            }
        }
        if (this.attacking == true){
            this.reloading = false
            this.bowReload = 0
            this.meleeReload += 1
            drawRect('#ffffff',this.x-20,this.y-50,40,5)
            drawRect('#0000ff',this.x-20,this.y-50,this.meleeReload/(60*this.meleeAttackSpeed)*40,5)
            if(this.meleeReload>=60*this.meleeAttackSpeed){
                this.meleeReload = 0
                const closestEnemy = enemyBases[0].enemys.find(enemy => Math.sqrt(Math.pow((this.x-20)-(enemy.x-20+x),2)+Math.pow((this.y-20)-(enemy.y-20+y),2))<=60)
                if(closestEnemy != undefined){
                    closestEnemy.hp -= this.meleeDmg
                    if (closestEnemy.hp<=0){
                        enemyBases[0].enemys.splice(enemyBases[0].enemys.indexOf(closestEnemy),1)
                    }
                }
            }
        }
        else{
            this.meleeReload = 0
        }
        drawRect('#ffffff',this.x-20,this.y-40,40,10)
        drawRect('#ff0000',this.x-20,this.y-40,(this.hp/this.max_hp)*40,10)
        for (let i=0; i<this.army.length; i++){
            this.army[i].draw()
        }
    }
    drawMiniMap(){
        drawRect('#00ff00',875+(this.x-20)/12,75+(this.y-20)/12,40/12,40/12)
        for (let i=0; i<this.farms.length; i++){
            this.farms[i].drawMiniMap()
        }
        for (let i=0; i<this.houses.length; i++){
            this.houses[i].drawMiniMap()
        }
        for (let i=0; i<this.army.length; i++){
            this.army[i].drawMiniMap()
        }
    }
    drawMap(){
        drawRect('#00ff00',350+(this.x-20)/12,350+(this.y-20)/12,40/12,40/12)
        for (let i=0; i<this.farms.length; i++){
            this.farms[i].drawMap()
        }
        for (let i=0; i<this.houses.length; i++){
            this.houses[i].drawMap()
        }
    }
    displayStats(){
        const txt = [new Txt('Gold -- '+Math.floor(this.gold),900,300),new Txt('Food -- '+Math.floor(this.food),900,350),
        new Txt('Army Size -- '+this.armySize+'/'+this.armyCapacity,900,400), new Txt('HP -- '+this.hp+'/'+this.max_hp,900,450),
        new Txt('Food/s -- '+this.fps/10+'/s',900,500), new Txt('Gold/s -- '+this.gps/10+'/s',900,550), new Txt('Pop. -- '+this.population+'/'+this.max_population,900,600)]
        for (let i=0; i<txt.length; i++){txt[i].drawOnSidePanal()}
    }
    keyPress(e,bln){
        const index = this.keys.findIndex(key => key === e.key)
        if(index != -1){this[this.vars[index]] = bln}
    }
}
class Enemy{
    constructor(x,y,hp,dmg){
        this.x = x
        this.y = y
        this.hp = hp
        this.max_hp = hp
        this.time = 0
        this.dmg = dmg
    }
    draw(){
        const x_dist = (player.x-20)-(this.x-20+x)
        const y_dist = (player.y-20)-(this.y-20+y)
        const dist = Math.sqrt(Math.pow(x_dist,2)+Math.pow(y_dist,2))
        const allyCollision = enemyBases[0].enemys.find(enemy => enemy != this && Math.sqrt(Math.pow((enemy.x-20+x)-(this.x-20+x),2)+Math.pow((enemy.y-20+y)-(this.y-20+y),2))<=60)
        const enemyInRange = player.army.find(enemy => Math.sqrt(Math.pow((enemy.x-20+x)-(this.x-20+x),2)+Math.pow((enemy.y-20+y)-(this.y-20+y),2))<=Math.sqrt(320000))
        if (enemyInRange != undefined){
            const x_dif = (enemyInRange.x-20+x)-(this.x-20+x)
            const y_dif = (enemyInRange.y-20+y)-(this.y-20+y)
            const dif = Math.sqrt(Math.pow(x_dif,2)+Math.pow(y_dif,2))
            if (allyCollision == undefined){
                if (dif>60){
                    const xspd = (x_dif/dif)*8
                    const yspd = (y_dif/dif)*8
                    this.x += xspd
                    this.y += yspd
                }
                else{
                    this.time += 1
                    drawRect('#ffffff',this.x-20+x,this.y-50+y,40,5)
                    drawRect('#0000ff',this.x-20+x,this.y-50+y,(this.time/60)*40,5)
                    if (this.time>=60){
                        this.time = 0
                        enemyInRange.hp -= this.dmg
                        if (enemyInRange.hp<=0){
                            player.army.splice(player.army.indexOf(enemyInRange),1)
                        }
                    }
                }
            }
            else{
                const x_dist = (allyCollision.x-20+x)-(this.x-20+x)
                const y_dist = (allyCollision.y-20+y)-(this.y-20+y)
                const dist = Math.sqrt(Math.pow(x_dist,2)+Math.pow(y_dist,2))
                const xspd = (x_dist/dist)*8
                const yspd = (y_dist/dist)*8
                this.x -= xspd
                this.y -= yspd
            }
        }
        else if (dist<=Math.sqrt(320000) && dist>=60){
            if (allyCollision == undefined){
                const xspd = (x_dist/dist)*8
                const yspd = (y_dist/dist)*8
                this.x += xspd
                this.y += yspd
            }
            else{
                const x_dist = (allyCollision.x-20+x)-(this.x-20+x)
                const y_dist = (allyCollision.y-20+y)-(this.y-20+y)
                const dist = Math.sqrt(Math.pow(x_dist,2)+Math.pow(y_dist,2))
                const xspd = (x_dist/dist)*8
                const yspd = (y_dist/dist)*8
                this.x -= xspd
                this.y -= yspd
            }
        }
        if (dist<=60 && enemyInRange==undefined){
            this.time += 1
            drawRect('#ffffff',this.x-20+x,this.y-50+y,40,5)
            drawRect('#0000ff',this.x-20+x,this.y-50+y,(this.time/60)*40,5)
        }
        else{
            if (enemyInRange == undefined){
                this.time = 0
            }
        }
        if (this.time>=60){
            this.time = 0
            player.hp -= this.dmg
        }
        drawRect('#7d0000',this.x-20+x,this.y-20+y,40,40)
        drawRect('#ffffff',this.x-20+x,this.y-40+y,40,10)
        drawRect('#ff0000',this.x-20+x,this.y-40+y,(this.hp/this.max_hp)*40,10)
    }
    drawMiniMap(){
        drawRect('#7d0000',875+(this.x-20+x)/12,75+(this.y-20+y)/12,40/12,40/12)
    }
}
class EnemyBase{
    constructor(){
        this.enemys = [new Enemy(1600,1600,100,5), new Enemy(1700,1600,100,5),new Enemy(1800,1600,100,5),new Enemy(1600,1700,100,5),new Enemy(1700,1700,100,5),new Enemy(1800,1700,100,5)]
    }
    draw(){
        for (let i=0; i<this.enemys.length; i++){
            this.enemys[i].draw()
        }
    }
    drawMiniMap(){
        for (let i=0; i<this.enemys.length; i++){
            this.enemys[i].drawMiniMap()
        }
    }
    drawMap(){}
}
const enemyBases = [new EnemyBase()]
const player = new Player()
let time = 0
let fps = 60
function mainLoop(){
    drawRect('#7d7d7d',800,0,200,200)
    player.drawMiniMap()
    for (let i=0; i<enemyBases.length; i++){enemyBases[i].drawMiniMap()}
    time += 1
    drawRect('#007d00',0,0,800,800)
    for (let i=0; i<enemyBases.length; i++){enemyBases[i].draw()}
    player.draw()
    if(mapOpen==true){
        drawRect('#7d7d7d',0,0,800,800)
        for (let i=0; i<enemyBases.length; i++){enemyBases[i].drawMap()}
        player.drawMap()
        drawRect('#ffffff',800,0,200,800)
    }
    drawRect('#ffffff',800,200,200,600)
    new Txt('FPS -- '+fps,900,250).drawOnSidePanal()
    player.displayStats()
    requestAnimationFrame(mainLoop)
}
mainLoop()
window.addEventListener('keydown',function(e){
    player.keyPress(e,true)
    if(e.key == 'm'){
        if(mapOpen==false){mapOpen=true}
        else{mapOpen=false}
    }
})
window.addEventListener('keyup',function(e){player.keyPress(e,false)})
window.addEventListener('mousedown',function(e){
    player.reloading = true
})
window.addEventListener('mouseup',function(e){
    player.reloading = false
    player.bowReload = 0
})
window.addEventListener('mousemove',function(e){
    player.mouseX = e.pageX-10
    player.mouseY = e.pageY-10
})
setInterval(() => {
    fps = time
    time = 0
},1000)
