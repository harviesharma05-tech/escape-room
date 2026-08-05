/* =====================================
   UTILITY FUNCTIONS
===================================== */


function random(min,max){

    return Math.floor(

        Math.random()*(max-min+1)

        +min

    );

}



function randomChoice(array){

    return array[

        random(0,array.length-1)

    ];

}



function delay(ms){

    return new Promise(

        resolve=>setTimeout(resolve,ms)

    );

}



function formatTime(seconds){

    let min=Math.floor(seconds/60);

    let sec=seconds%60;


    return (

        String(min).padStart(2,"0")

        +":"

        +

        String(sec).padStart(2,"0")

    );

}



function createElement(tag,className,text){

    const el=document.createElement(tag);


    if(className)

        el.className=className;


    if(text)

        el.innerHTML=text;


    return el;

}



function showMessage(message,type="info"){


    const div=document.createElement("div");


    div.className="toast "+type;


    div.innerHTML=message;


    document.body.appendChild(div);


    setTimeout(()=>{

        div.remove();

    },3000);

}
