var juego = new Phaser.Game(1280 , 720 , Phaser.AUTO, '' ,{preload: preload , create: create, update : update}) ;

var jugador ;
var inicioX = 0
var inicioY = 2300
var restart = false
var stats = {
    vidas:3,
    puntos:null
}
var vidas
const gravedad = 1500;

var plat ;
var bloqueMario
var fuego ;
var escalera;
var flechitas ;
var doble = false ;
var pwpMario ; 
var pwpArma ;
var pwp1=false 
var pinche;
var disFlechas
var flechas
var enemigo = []
var velDisp
var tiemDisp= false
var teclaEspacio;
var disparo;
var disparoReal ;
var pos;
var txtPosition
var txtPuntos
var txtMonedas

var txt1
var txt2
var txt3
var txt4
var txt5

var choclito
var reloj
var vidaExtra = 0
var cantMonedas = 0
var txtreloj
var finall = true
var tiempoMuerto;
var teclaH
var ras =2500
var trampa = true
var trampax = true
var miniatura
var tiempo = 0
var checkpoint
var coin
var puerta
var pantallaFinal
var sonMoneda
var sonDaño
var sonMusica
var sonMuerte
var sonDisparo
var sonSalto




var puntosTotales = {
    tiempo:100000,
    vidas:0,
    choclitos: 0 ,
    puntos : 0 ,
    total : 0 ,
}

function preload () {
    
    this.load.image('cuadricula','imagenes/cuadricula.png' ) ;
    this.load.image('fondo1','imagenes/fondo1.png' ) ;
    this.load.image('fondoNoche','imagenes/fondoNoche.png' ) ;

    this.load.image('piso','imagenes/nivel/plat_l.png'  ) ;
    this.load.image('plat4','imagenes/nivel/plat_m.png'  ) ;
    this.load.image('plat3','imagenes/nivel/platS.png'  ) ;
    this.load.image('plat2','imagenes/nivel/plat_sx.png'  ) ;
    this.load.image('plat1','imagenes/nivel/plat_sxx.png'  ) ;
    this.load.image('piso1','imagenes/nivel/platDark_l.png'  ) ;
    
    this.load.image('paredInv','imagenes/Pampa/pared_invisible.png' ) ;
    this.load.image('bloqueMario','imagenes/bloqueMario.png' ) ;
    this.load.image('bloqueSalto','imagenes/bloqueSalto.png' ) ;

    this.load.image('bloque','imagenes/bloque.png' ) ;
    this.load.image('pinche','imagenes/pinche.png' ) ;
    this.load.image('bloque1','imagenes/bloque1.png' ) ;
    this.load.image('bloqueDark','imagenes/bloqueDark.png' ) ;
    this.load.image('bloque1Dark','imagenes/bloque1Dark.png' ) ;
    
    this.load.image('disFlechas','imagenes/disFlechas.png' ) ;
    this.load.image('flechas','imagenes/flechas.png' ) ;
    
    this.load.image('tuberia','imagenes/tuberia.png' ) ;
    this.load.image('escalera','imagenes/escalera.png'  ) ;
    this.load.image('pantallaFinal','imagenes/pantallaFinal.png'  ) ;

    this.load.spritesheet('coin','imagenes/Pampa/pickup.png',34.5,38 ) ;

    
    
    this.load.spritesheet('fuego', 'imagenes/Pampa/fuego.png',34,52) ;
    this.load.spritesheet('pwpMario', 'imagenes/pwpMario.png',50,50) ;
    
    this.load.spritesheet('enemigo1', 'imagenes/arquero.png',43,79) ;
    this.load.spritesheet('puerta', 'imagenes/Pampa/puerta.png',40,66) ;

    this.load.spritesheet('disparo', 'imagenes/disparo.png',35,35) ;


    this.load.spritesheet('enemigo0', 'imagenes/Pampa/enemigo.png',63,33) ;



    this.load.spritesheet('pj','imagenes/nivel/pj.png',36.833333,70) ;
    this.load.spritesheet('pwpArma','imagenes/pwpArma.png',36.833333,70) ;
    this.load.spritesheet('miniatura','imagenes/pjMiniatura.png',100,100);
    this.load.spritesheet('checkpoint','imagenes/Pampa/objetivo.png',64,61)


    this.load.spritesheet('pjMario','imagenes/nivel/pjMario.png',36.833333,70) ;

    
    
    this.load.audio('sonMoneda', ['audio/coin.mp3'])
    this.load.audio('sonDaño', ['audio/pisar.WAV'])
    this.load.audio('sonDisparo', ['audio/puerta.WAV'])
    this.load.audio('sonMusica', ['audio/mario64.mp3'])
    this.load.audio('sonMuerte', ['audio/muerte2.mp3'])
    this.load.audio('sonSalto', ['audio/saltar.WAV'])
}

function anEnemigo0 (enemigo) {
        for ( var i = 0 ; i < enemigo[0].children.length ; i++) {
            enemigo[0].children[i].animations.add("caminarEnemigo",[1,2],3,true) ;
            enemigo[0].children[i].animations.play('caminarEnemigo');
            enemigo[0].children[i].body.collideWorldBounds=true;
            enemigo[0].children[i].body.velocity.x = 100 ;
            enemigo[0].children[i].anchor.x = 0.5 ;
            enemigo[0].children[i].anchor.y = 0.5 ;
        }
}
function anEnemigo1 (enemigo) {
        for ( var i = 0 ; i < enemigo[1].children.length ; i++) {
            enemigo[1].children[i].animations.add("atacar",[1,2,0],3,false) ;

            enemigo[1].children[i].body.collideWorldBounds=true;
            enemigo[1].children[i].anchor.x = 0.5 ;
            enemigo[1].children[i].anchor.y = 0.5 ;
        }
}

function crearEn (tipo,cant , xMax,xMin,yMax,yMin ) {
            for (var i = 0; i < cant; i++) {
                enemigo[tipo].create(parseInt(Math.round(Math.random()* (xMax - xMin) + xMin)),parseInt(Math.round(Math.random()* (yMax - yMin) + yMin)) , 'enemigo'+tipo);
                
                   // enemigo[1].children[enemigo[1].children.length-1].body.moves=false ;
                    //enemigo[1].children[enemigo[1].children.length-1].body.immovable = true;
                }
            }

function asignarVidas(cual,vida){
        for(var i = 0 ; i<enemigo[cual].children.length;i++){
                enemigo[cual].children[i].vida = vida;
            }
}


function crearFuego (c,x,y,f) {
    
    for(var i = 0; i < c ; i++){
        fuego.create(x,y,f)
        x= x + 30
    }
    
}
function fijar (fijo){
        for (i=0; i < fijo.children.length; i++) {
            fijo.children[i].body.moves=false ;
            fijo.children[i].body.immovable = true;
            
        }
    }

function resetInvencible () {
        stats.invensible = false ;
    }
function resetDisp(){
    tiemDisp = true
}

function create () {
    juego.physics.startSystem(Phaser.Physics.ARCADE);
    this.physics.arcade.gravity.y = gravedad ;
        
        this.add.image(0, 1840,'fondo1');
        this.add.image(0, 920,'fondoNoche');

        
    
    
        plat = this.add.group() ;
        plat.enableBody = true
        
    
 
        
        plat.create(0,1630,"tuberia")

        plat.create(4100,1600,"tuberia")
        plat.create(3900,1550,"bloque1Dark")
        plat.create(3850,1550,"bloque1Dark")    

        plat.create(3700,1550,"bloque1Dark") 
        plat.create(3650,1550,"bloque1Dark")    

        plat.create(3500,1550,"bloque1Dark")    
        plat.create(3450,1550,"bloque1Dark")    
        plat.create(3230,1470,"bloque1Dark")
        plat.create(3230,1270,"bloque1Dark")
        plat.create(3200,1600,"tuberia")
        var asd = 1500
        for (var x = 0; x < 12 ; x++){
             asd = asd-50
            plat.create(2900,asd,"bloque1Dark") 
            
        }
        plat.create(5360,1700,"piso1")
        plat.create(4600,1700,"piso1")
        plat.create(3500,1700,"piso1")
        plat.create(2600,1700,"piso1")
        plat.create(1600,1700,"piso1")
        plat.create(800,1700,"piso1")
        plat.create(0,1700,"piso1")
        plat.create(0,1200,"piso1")
        plat.create(180,1500,"piso1")
        plat.create(1100,1500,"piso1")
        plat.create(2000,1500,"piso1")
         plat.create(800,1200,"piso1")
    plat.create(1700,1200,"piso1")


        
        plat.create(5800+100,1100,"plat2")
        
        plat.create(5250+100,1100,"bloque1Dark")    
        plat.create(5050+100,1250,"bloque1Dark")    
        plat.create(5250+100,1400,"bloque1Dark")
        plat.create(5050+100,1500,"bloque1Dark")
        plat.create(5250+100,1600,"tuberia")
        plat.create(6250, 2450, "bloqueSalto")
        
        
        
        plat.create(6150,2600,"plat2")
        plat.create(3800,2600,"piso")
        plat.create(2900,2600,"piso")
        plat.create(2000,2600,"piso")
        plat.create(900,2600,"piso")
        plat.create(0,2600,"piso")
    
        
        
        
               
        plat.create(1350,2450,"bloque")
        plat.create(1400,2450,"bloque")
        plat.create(1200,2450,"bloque")
        
        
        
        plat.create(1700,2500,"tuberia")
        plat.create(0,2500,"tuberia")

    
        plat.create(2600,2550,"bloque")
        plat.create(2650,2550,"bloque1")
        plat.create(2700,2550,"bloque1")
        plat.create(2750,2550,"bloque1")
        plat.create(2650,2500,"bloque")
        plat.create(2700,2500,"bloque1")
        plat.create(2750,2500,"bloque1")
        plat.create(2700,2450,"bloque")
        plat.create(2750,2450,"bloque1")
        plat.create(2750,2400,"bloque")
        
        plat.create(2950,2350,"bloque1")
        plat.create(3200,2350,"bloque1")
        
        plat.create(3400,2550,"bloque1")
        plat.create(3450,2550,"bloque1")
        plat.create(3500,2550,"bloque1")
        plat.create(3550,2550,"bloque")
        plat.create(3400,2500,"bloque1")
        plat.create(3400,2450,"bloque1")
        plat.create(3400,2400,"bloque")
        plat.create(3450,2450,"bloque")
        plat.create(3500,2500,"bloque")
        plat.create(3450,2500,"bloque1")
    
        fijar(plat)
            
        bloqueMario = this.add.group();
        bloqueMario.enableBody=true;
        bloqueMario.create(1300,2450,"bloqueMario")
        fijar(bloqueMario)    
        
        pinche = this.add.group();
        pinche.enableBody = true ;
        pinche.create (3820, 920, "pinche")
        pinche.create (3720, 920, "pinche")
        pinche.create (3620, 920, "pinche")
        pinche.create (3520, 920, "pinche")
        
      
    
        fijar (pinche)
        
        puerta = this.add.group ()
        puerta.enableBody = true ;
        puerta.create(100,1140,'puerta')
        puerta.children[0].animations.add("anPuerta",[0,1],2,true) ;
        puerta.children[0].animations.play('anPuerta');
        fijar(puerta)
        
        pwpMario = this.add.group ()
        pwpMario.enableBody = true ;
        
        pwpArma = this.add.group();
        pwpArma.enableBody = true;
        pwpArma.create(6000,1000,"disparo");
        pwpArma.children[0].scale.x=2
        pwpArma.children[0].scale.y=2
        pwpArma.children[0].animations.add("armaGira",[0,1,2,3,4,5,6,7],24,true) ;
        pwpArma.children[0].animations.play('armaGira');
        fijar(pwpArma)
    
        enemigo[0] = juego.add.group () ;
        enemigo[0].enableBody = true ;
        enemigo[1] = juego.add.group () ;
        enemigo[1].enableBody = true ;
        crearEn(0,10,3300,2800,2530,2500) ;
        crearEn(0,15,3000,100,1650,1650) ;
        crearEn(1,5,2800,100,1450,1450) ;

        crearEn(0,4,1600,1450,2530,2500) ;
        crearEn(1,1,4128,4130,1560,1560) ;
        crearEn(1,1,3250,3250,1560,1560) ;
        crearEn(1,1,3250,3250,1200,1200) ;
        crearEn(1,1,3250,3250,1360,1360) ;
         asignarVidas(0,3);
        anEnemigo0 (enemigo) ;        
        asignarVidas(1,5);
        anEnemigo1 (enemigo) ;
    
        
        flechas= this.add.group() ;
        flechas.enableBody=true 
            
        fuego = this.add.group() ;
        fuego.enableBody = true;
        fuego.create (1980, 2710, 'fuego' );
        fuego.create (1950, 2710, 'fuego' );
        fuego.create (1920, 2710, 'fuego' );
        fuego.create (1890, 2710, 'fuego' );
        fuego.create (1860, 2710, 'fuego' );
        crearFuego(27,3300,1650,"fuego") ;
        crearFuego(29,5450,1650,"fuego") ;
        fijar(fuego);
        for (var i = 0 ; i < fuego.children.length ; i++) {
            fuego.children[i].animations.add("anFuegos", [0,1,2], 6 , true) ;
            fuego.children[i].animations.play ('anFuegos') ;
        }
        
        escalera = this.add.group();
        escalera.enableBody=true
        escalera.create (4500, 1682, 'escalera' )
        fijar (escalera) ;
    
        this.add.image(0, 0,'cuadricula');
        
        jugador = this.add.sprite(inicioX,inicioY,'pj') ;
        juego.physics.arcade.enable(jugador);
        jugador.body.collideWorldBounds = true;
        jugador.animations.add("parado", [0],12,true);
        jugador.animations.add("caminar", [3,4,5], 12,false);
        jugador.animations.add("caminarleft", [9,10,11], 12,false);
        jugador.animations.add("anDaño", [0,3,6,9,0,3,6,9,0], 24,true);
        
        pantallaFinal= this.add.group();
        pantallaFinal.enableBody=true ;
        
        
        teclaEspacio = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR) ;
        teclaEspacio.onDown.add(ataque , this) ;
        disparo = this.add.group() ;
        disparo.enableBody=true;
        
        checkpoint= this.add.group();
        checkpoint.enableBody=true ;
        checkpoint.create(4700,1600,"checkpoint") ;
    checkpoint.create(2800,1400,"checkpoint") ;
        for (var z = 0 ; z < checkpoint.children.length ; z++) {
            checkpoint.children[z].animations.add('vaquita', [0,1],2,true) ;
            checkpoint.children[z].animations.play ('vaquita') ;
        }
    
    
        teclaH = this.input.keyboard.addKey(Phaser.Keyboard.H) ;
        teclaH.onDown.add(vidasExtra , this) ;
    
        tiempoMuerto = juego.time.create(false) ;
        tiempoMuerto.loop(500,resetInvencible,this)
    
        velDisp = juego.time.create(false)
        velDisp.loop(1500,resetDisp,this)
        
        
        this.world.setBounds(0, 0, 6400, 2760);
        this.physics.startSystem(Phaser.Physics.P2JS);
        this.physics.p2.enable(jugador);
        this.camera.follow(jugador);
    if(pwp1 == true){
          jugador.loadTexture('pjMario');
      }
    if(disparoReal == true){
          jugador.loadTexture('pwpArma');
      }
        flechitas = this.input.keyboard.createCursorKeys();
            txtPosition = this.add.text(30,30, "ahre", {fontSize:'20px',fill:'#ff2b55'})
            txtPosition.fixedToCamera=true
            txtPosition.cameraOffset.setTo(0,250)
    
           coin = juego.add.group() ;
        coin.enableBody=true;
        crearCoin(10,100,1100, 2550, 2550) ;
        crearCoin(3,1200,1400, 2400, 2400) ;
        crearCoin(15,1850,2500, 2550, 2550) ;
        crearCoin(30,2800,3300,2550,2550);
        crearCoin(60,5900,5450,1100,1250);
        crearCoin(10,4000,3450,1500,1500);
        crearCoin(5,4450,4200,1650,1650);
        crearCoin(40,3000,200,1650,1650);
         crearCoin(30,2500,300,1150,1150);

        anCoin (coin)
        fijar (coin)
        
        miniatura = this.add.sprite(0,0,"miniatura");
        miniatura.fixedToCamera=true
        miniatura.animations.add("damangels",[1,0],3,false) ;
        miniatura.animations.add("muertels",[1,2],3,false) ;
        
        choclito = this.add.sprite(150,75,"coin");
        choclito.fixedToCamera=true
        txtMonedas = this.add.text(30,30, "x" + cantMonedas , {fontSize:'40px',fill:'#ff2b55'})
        txtMonedas.fixedToCamera=true
        txtMonedas.cameraOffset.setTo(200,70)
        
        vidas = this.add.text(30,30, "vidas : " +stats.vidas , {fontSize:'40px',fill:'#ff2b55'})
        vidas.fixedToCamera=true
        vidas.cameraOffset.setTo(150,25)
        
        puntos = this.add.text(30,30, stats.puntos, {fontSize:'45px',fill:'#ff2b55'})
        puntos.fixedToCamera=true
        puntos.cameraOffset.setTo(530,40)
        
        txtReloj = this.add.text(30,30, tiempo, {fontSize:'40px',fill:'#ff2b55'})
        txtReloj.fixedToCamera=true
        txtReloj.cameraOffset.setTo(640,0)
        reloj= this.time.create(false) ;
        reloj.loop(1000,crearTimer,this) ;
        reloj.start()
    
        
        txt1 = this.add.text(300,1140, "", {fontSize:'45px',fill:'#ff2b55'})
    
        txt2 = this.add.text(655,1140, "", {fontSize:'45px',fill:'#ff2b55'})
    
        txt3 = this.add.text(300,1230, "", {fontSize:'45px',fill:'#ff2b55'})
    
        txt4 = this.add.text(655,1230, "", {fontSize:'45px',fill:'#ff2b55'})
    
        txt5 = this.add.text(450,1400, "", {fontSize:'45px',fill:'#ff2b55'})
    
    
        sonMusica = this.add.audio('sonMusica');
        sonMusica.volume=0.2

        sonDisparo = this.add.audio('sonDisparo');
        sonDisparo.volume=0.2

        sonSalto = this.add.audio('sonSalto');
        sonSalto.volume=0.1

        sonDaño = this.add.audio('sonDaño');
        sonDaño.volume=0.3

        sonMuerte = this.add.audio('sonMuerte');
        sonMuerte.volume=0.4

        sonMoneda = this.add.audio('sonMoneda');
        sonMoneda.volume=0.3

        sonMusica.play();
    
    
}
function crearCoin (cant,minX, maxX, minY, maxY) {
            for (var i = 0; i < cant ; i++) {
         coin.create(parseInt(Math.round(Math.random()* (maxX - minX) + minX)),parseInt(Math.round(Math.random()* (maxY - minY) + minY)) , 'coin');
                
                }
            }
function anCoin (coin) {
        for (var i = 0 ; i < coin.children.length ; i++) {
            coin.children[i].animations.add("anCoin", [0,1,2,3], 8 , true) ;
            coin.children[i].animations.play ('anCoin') ;
        }
    }

function crearTimer (){
            tiempo++
            puntosTotales.tiempo= puntosTotales.tiempo - 100
            txtReloj.text = String(parseInt(txtReloj.text) + 1) ;
            stats.puntos =  stats.puntos - 10
            }
function update () {
        vidas.text="Vidas : " + stats.vidas
        
        puntos.text="Puntos : " +stats.puntos
        posX = Math.trunc(jugador.body.position.x)
        posY =Math.trunc( jugador.body.position.y)
        txtPosition.text=" X " +posX + " Y " + posY
        this.physics.arcade.collide(jugador,plat,saltar) ;
        this.physics.arcade.collide(pwpMario,plat, mover) ;
        this.physics.arcade.collide(checkpoint,plat) ;

        this.physics.arcade.collide(bloqueMario,jugador,romper) ;
        this.physics.arcade.collide(enemigo,plat,rebotar) ;
        this.physics.arcade.collide(jugador,enemigo[0],matar) ;
        this.physics.arcade.collide(disparo,enemigo[0],dañoDisp);
        this.physics.arcade.collide(disparo,enemigo[1],dañoDisp);
        this.physics.arcade.collide(jugador,flechas,quemar);
                this.physics.arcade.collide(flechas,plat,romperse);

            this.physics.arcade.collide(disparo,plat,romperse);



        this.physics.arcade.overlap(jugador,pwpArma,dispararArma) ;
        this.physics.arcade.overlap(jugador,coin,moneda) ;

        this.physics.arcade.overlap(jugador,checkpoint,vaquita) ;
        this.physics.arcade.overlap(jugador,puerta,victoria) ;


        this.physics.arcade.overlap(jugador,pinche,pinchar) ;
        this.physics.arcade.overlap(jugador,fuego,quemar) ;
        this.physics.arcade.overlap(jugador,escalera,subir) ;
        this.physics.arcade.overlap(jugador,pwpMario,poder1) ;
        flechitas.right.onUp.add(parar,this) ;
        flechitas.left.onUp.add(parar,this) ;
        
        if(stats.vidas <= 0 ){
            miniatura.animations.play("muertels")
        }
    
        agro0()
        arqAtacar()
        calcDist0(jugador,enemigo)
    
       // if (jugador.body.position.y <1400 &&jugador.body.position.y > 1150) {
       //     flechas.create (disFlechas.children[0].position.x+60 ,disFlechas.children[0].position.y+17, "flechas")
        //    flechas.children[flechas.length-1].body.velocity.x =1500
       //     flechas.children[flechas.length-1].body.velocity.y =-60
       // }
        
    for (var h = 0 ; h < pinche.children.length; h++){
        if (jugador.body.position.x > pinche.children[h].position.x-20 && jugador.body.position.x < pinche.children[h].position.x+20  && jugador.body.position.x > pinche.children[h].position.y && jugador.body.position.y < 1630) {
            pinche.children[h].body.moves = true ;
            pinche.children[h].body.velocity.y=900
        }}
        
     if(flechitas.right.isDown){
        
    jugador.body.velocity.x = 600;
        jugador.animations.play ('caminar') ;
        
    }   
       if(flechitas.left.isDown){
    
    jugador.body.velocity.x = -600;
           jugador.animations.play ('caminarleft') ;
    }  
    if(flechitas.down.isDown){
    
    jugador.body.velocity.y = 600;
    }
   if (doble == true) {
       
    if(flechitas.up.isDown){
    jugador.body.velocity.y = -450;
        doble = false ;
                sonSalto.play()
}  }
    
    if(stats.vidas == 0 ){
        stats.vidas=3
        stats.invensible=false ;
        stats.puntos=stats.puntos - 10000
        ras =2500
        cantMonedas = 0
        sonMusica.stop()

        this.game.state.restart(true,false);
        console.log("ahre")
                trampax=true
}

    if(trampax==true){
    if (posX < 2600 && posY < 1200){
        trampa= true
        if (trampa== true) {
            trampax = false    
            for(var r = 0; r < 40 ; r++){
            pinche.create (ras, 920, "pinche")
            ras = ras - 40
                fijar (pinche)
                trampa = false
        }
        }
    }   
 }
    puntosTotales.vidas = 500*stats.vidas;
    puntosTotales.choclitos = cantMonedas * 100
    puntosTotales.puntos = stats.puntos
    puntosTotales.total= puntosTotales.choclitos + puntosTotales.puntos + puntosTotales.tiempo + puntosTotales.vidas ;
}


function parar () {
    
         jugador.body.velocity.x = 0 ;
        jugador.animations.play ('parado') ;
    }

function saltar (jugador, plat) {
    doble = true
    if (jugador.body.touching.down == true){
        if(flechitas.up.isDown){
            jugador.body.velocity.y = -450;
            doble = true
            sonSalto.play()
    }   
    }
}

function subir (jugador, escalera) {
        jugador.animations.add("subir", [6,7,8],2 , false) ;
             
        if(flechitas.up.isDown){
            jugador.body.velocity.y = -450;
            jugador.animations.play ('subir') ;}
}

function poder1 (jugador, pwpMario){
            jugador.loadTexture('pjMario');
            jugador.animations.add("transformarse", [0,3,,6,9,0,3,,6,9,0,3,,6,9,0], 24 , false) ;
            jugador.animations.play ('transformarse') ; 
            pwpMario.kill()
            sonDaño.play();

            pwp1=true
            stats.puntos=stats.puntos + 200
    

}
function romper (jugador, bloqueMario){
    if(jugador.body.touching.up == true) {
        pwpMario.create(1300,2400,"pwpMario")
        pwpMario.children[0].animations.add("anMario", [0,1,2,3,4,5,6,7,8,9,10,11], 12 , true) ;
        pwpMario.children[0].animations.play ('anMario') ; 
        pwpMario.children[0].body.velocity.x = 200 ;
        pwpMario.children[0].body.velocity.y = -500 ;
        bloqueMario.kill();
                    sonDaño.play();

        stats.puntos=stats.puntos + 10
    }  
    }
function mover (pwpMario, plat){
    if (pwpMario.body.touching.right==true){
        pwpMario.body.velocity.x = -200
                        stats.puntos=stats.puntos + 200

    }
}
function pinchar (jugador, pinche){
    stats.vidas--
            sonMuerte.play()

    
                    stats.puntos=stats.puntos - 200

                miniatura.animations.play('damangels');

    pinche.kill()
    
}
function quemar (jugador, fuego) {
     jugador.animations.play('anDaño')
   // sonMuerte.play()

    if(!stats.invensible) {
        stats.vidas-- ; 
        stats.puntos=stats.puntos - 200
                    sonMuerte.play()


         miniatura.animations.play('damangels');

        //texto.text = ("vidas:"+ stats.vidas );
        stats.invensible=true ;
        tiempoMuerto.start() ;
    }
    if (stats.vidas <= 0) {
        jugador.kill() ;
        sonMuerte.play()

       // sonMuerte.play();
        
       // texto.text = ("Haz Muerto" );
    }
    jugador.body.velocity.y=-400;
}


function agro0 () {
        var calcy = jugador.position.y + 53.5 ;
        for (var i = 0 ; i < enemigo[0].children.length ; i++) {
            if (enemigo[0].children[i].distanciaX > -200 && enemigo[0].children[i].distanciaX<0 && calcy == enemigo[0].children[i].y) {
                        enemigo[0].children[i].body.velocity.x = -250
                        enemigo[0].children[i].body.velocity.y = -950
    }
    if (enemigo[0].children[i].distanciaX < 200 && enemigo[0].children[i].distanciaX>0 && calcy == enemigo[0].children[i].y) {
                        enemigo[0].children[i].body.velocity.x = 250
            enemigo[0].children[i].body.velocity.y = -950}

        }
    }

function calcDist0 (jugador, enemigo) {
    var pjx = jugador.x
    var pjy = jugador.y
    for (var i = 0 ; i < enemigo[0].children.length ; i++) {
        
        enemigo[0].children[i].distanciaX = pjx - enemigo[0].children[i].x ;
        enemigo[0].children[i].distanciaY = pjy - enemigo[0].children[i].y ;
        enemigo[0].children[i].distanciaTotal = Math.sqrt(enemigo[0].children[i].distanciaX * enemigo[0].children[i].distanciaX + enemigo[0].children[i].distanciaY * enemigo[0].children[i].distanciaY) ;

    }
}

function rebotar(enemigo, plat){
            if(enemigo.body.touching.left){
                enemigo.body.velocity.x=200
            }
            if(enemigo.body.touching.right){
                enemigo.body.velocity.x=-200
                
            }
            if (enemigo.body.velocity.x > 0){
                enemigo.scale.x=1
            }
                else{enemigo.scale.x=-1}
        
    }


function matar (jugador, enemigo) {
    if (enemigo.body.touching.right == true && jugador.body.touching.left == true) {//sonMuerte.play()
            if(!stats.invensible) {
                stats.vidas-- ;
                            sonMuerte.play()

                                stats.puntos=stats.puntos - 200

                            miniatura.animations.play('damangels');

                //texto.text = ("vidas:"+ stats.vidas );
                jugador.body.velocity.x=500;
                jugador.body.velocity.y=-800;
                jugador.animations.play('anDaño')

                stats.invensible=true ;
                tiempoMuerto.start() ;
                
    }
        }
        if (enemigo.body.touching.left == true && jugador.body.touching.right == true) {//sonMuerte.play()
            if(!stats.invensible) {
        stats.vidas-- ;
                            sonMuerte.play()

                                stats.puntos=stats.puntos - 200

                            miniatura.animations.play('damangels');

        // texto.text = ("vidas:"+ stats.vidas );
        stats.invensible=true ;
        tiempoMuerto.start() ;
        jugador.body.velocity.x=-500;
        jugador.body.velocity.y=-800;
        jugador.animations.play('anDaño')

    }
        
    }
    if (pwp1==false){
    if (jugador.body.touching.down == true && enemigo.body.touching.up == true) {//sonMuerte.play()
            if(!stats.invensible) {
        stats.vidas-- ;
                            sonMuerte.play()

                                stats.puntos=stats.puntos - 200

                            miniatura.animations.play('damangels');

        // texto.text = ("vidas:"+ stats.vidas );
        stats.invensible=true ;
        tiempoMuerto.start() ;
        jugador.body.velocity.y=-800;
        jugador.animations.play('anDaño')

    }
        
    }}
    if (jugador.body.touching.up == true && enemigo.body.touching.down == true) {//sonMuerte.play()
            if(!stats.invensible) {
        stats.vidas-- ;
                            sonMuerte.play()

                stats.puntos=stats.puntos - 200
                            miniatura.animations.play('damangels');

        // texto.text = ("vidas:"+ stats.vidas );
        stats.invensible=true ;
        tiempoMuerto.start() ;
        jugador.body.velocity.y=-800;
        jugador.animations.play('anDaño')

    }}
    if (stats.vidas <= 0) {
        jugador.kill() ;
                    sonMuerte.play()

        //sonMuerte.play();
        //texto.text = ("Haz Muerto" );
        }
    
    if (pwp1 == true ) {
        if (enemigo.body.touching.up == true) {
            enemigo.vida-- ;
                        sonDaño.play();

                            stats.puntos=stats.puntos + 20

            jugador.body.velocity.y=-400;
            //sonMuerte.play()
            if(enemigo.vida <=0) {enemigo.kill(); stats.puntos= stats.puntos+ 200}//sonMuerte.play();
    //enTotales-- ;
        }
    } 
    if (enemigo.body.touching.up == true ) {
        stats.invensible=true ;
        tiempoMuerto.start() ;
        
        
    }
    
}

function arqAtacar(){
    velDisp.start()
    if(tiemDisp==true){
        tiemDisp=false;
    for (var i = 0 ; i < enemigo[1].children.length; i++){
    enemigo[1].children[i].animations.play('atacar');
    if(jugador.body.position.x > enemigo[1].children[i].body.position.x - 450 && jugador.body.position.x < enemigo[1].children[i].body.position.x + 450){
      if (jugador.body.position.y<1700 && jugador.body.position.x > enemigo[1].children[i].body.position.x){         sonDisparo.play();
          
          
        flechas.create (enemigo[1].children[i].position.x ,enemigo[1].children[i].position.y+17, "flechas")
            flechas.children[flechas.length-1].body.velocity.x =1500
            flechas.children[flechas.length-1].body.velocity.y =-200}
        if (jugador.body.position.y<1700 && jugador.body.position.x < enemigo[1].children[i].body.position.x){         sonDisparo.play();

        flechas.create (enemigo[1].children[i].position.x ,enemigo[1].children[i].position.y+17, "flechas")
            flechas.children[flechas.length-1].body.velocity.x =-1500
            flechas.children[flechas.length-1].body.velocity.y =-200
            flechas.children[flechas.length-1].scale.x = -1
            }
    }}
}       for (var r = 0; r < flechas.children.length; r++)
        if (flechas.children[r].position.y > 2700 ){
           flechas.children[r].destroy()
}
       }

function ataque () {
    if (disparoReal==true){
                sonDisparo.play();

    disparo.create(jugador.x , jugador.y,'disparo')
        stats.puntos=stats.puntos -10
    //sonDisp.play();
    //this.physics.arcade.enable(disparo);
    disparo.children[disparo.length-1].animations.add('disparar', [0, 1, 2,3,4,5,6,7] , 48, true) ;
    disparo.children[disparo.length-1].animations.play('disparar');
    disparo.children[disparo.length-1].body.collideWorldBounds=true;
        disparo.children[disparo.length-1].scale.x=1.5;
        disparo.children[disparo.length-1].scale.y=1.5;

       if(flechitas.left.isDown){ 
    disparo.children[disparo.length-1].body.velocity.x = -2000 ;
       disparo.children[disparo.length-1].body.velocity.y = -200}
        if(flechitas.right.isDown){ 
    disparo.children[disparo.length-1].body.velocity.x = 2000 ;
        disparo.children[disparo.length-1].body.velocity.y = -200}
        if(flechitas.up.isDown){ 
    disparo.children[disparo.length-1].body.velocity.y = -1000 ;}
        if(flechitas.down.isDown){ 
    disparo.children[disparo.length-1].body.velocity.y = 100 ;}
   // juego.physics.arcade.overlap(disparo[i],enemigo[i],dañoDisp);
    var cantDisp = disparo.length
   // disparo.destroy();
    if (cantDisp==40){
            disparo.children[1].destroy()
        
    }
}}
function dispararArma (jugador, pwpArma) {
    pwpArma.kill();
    
            sonDisparo.play();

    disparoReal=true ;
    jugador.loadTexture('pwpArma');
    jugador.animations.play ('transformarse')
    stats.puntos=stats.puntos + 500;   
}

function dañoDisp (disparo,enemigo) {
    try{    disparo.kill()

    enemigo.vida--
                    sonDaño.play();

    if(enemigo.vida <=0){ enemigo.destroy(); //sonMuerte.play();
     stats.puntos= stats.puntos + 1000;}
    
        if(enemigo.body.touching.up==true){
        enemigo.body.velocity.y=100}
        if(enemigo.body.touching.down==true){
        enemigo.body.velocity.y=-300}
       }catch{}
}

           
           function vidasExtra(){
               stats.vidas= stats.vidas + 100
               pwp1=true
               disparoReal=true
           }
function romperse(disparo,plat){disparo.kill()}

function vaquita(jugador,checkpoint){
            sonMoneda.play();
    inicioX= checkpoint.position.x
    inicioY= checkpoint.position.y -50
    checkpoint.rotation=3.14
    restart=true
}
    function moneda(jugador, coin){
        coin.kill()
                sonMoneda.play();

        stats.puntos= stats.puntos + 20
        vidaExtra++
        cantMonedas++
        txtMonedas.text="x"+cantMonedas
        if(vidaExtra == 30){
            stats.vidas++
            vidaExtra= 0
        }
    }
    
function victoria (jugador,puerta){
    if (finall == true){
                sonMoneda.play();
        sonMoneda.play();
        sonMoneda.play();
        sonMoneda.play();
        sonMoneda.play();
        sonMoneda.play();
        sonMoneda.play();
        sonMoneda.play();
        sonMoneda.play();

    pantallaFinal.create(0,780,"pantallaFinal")
    fijar (pantallaFinal);
        txt1.text=(puntosTotales.tiempo)
    
        txt2.text=(puntosTotales.vidas)
    
        txt3.text=(puntosTotales.choclitos)
    
        txt4.text=(puntosTotales.puntos)
    
        txt5.text=(puntosTotales.total)
        finall = false }
}