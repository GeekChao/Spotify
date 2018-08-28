import {VOLUME_CONTROLLER, PROGRESS_CONTROLLER} from '../../constants';
import {convertMSToMin} from '../../util/convertDate';

let canvasArr;
let canvasMap = new Map();
let ctxMap = new Map();
let preXMap = new Map(), endMap = new Map(), isDraggingMap = new Map(), startMap = new Map();
let startTime = null;
const radius = 8;
const textWidth = 50;
let requestAnimationId = null;
let progress = 0;
let totalTime = 0;

const adjustVolume = player => percent => {
    percent = percent < 0 ? 0 : percent;
    percent = percent > 1 ? 1 : percent;

    player.setVolume(percent).then(() => {
        console.log(percent);
        console.log('Volume updated!');
    });
};

export const initCanvas = player => {
    canvasArr = document.querySelectorAll('#canvas');
    canvasArr.forEach(canvas => {
        const ctx = canvas.getContext('2d');
        const type = canvas.getAttribute('type');
        ctxMap.set(type, canvas.getContext('2d'));
        canvasMap.set(type, canvas);

        if(type === VOLUME_CONTROLLER){
            startMap.set(type, radius);
            preXMap.set(type, canvas.width - radius);
            endMap.set(type, canvas.width - radius);
        }else if(type === PROGRESS_CONTROLLER){
            startMap.set(type, radius + textWidth);
            preXMap.set(type, canvas.width - radius - textWidth);
            endMap.set(type, canvas.width - radius - textWidth);
        }

        canvas.addEventListener('click', evt => {
            if(type === VOLUME_CONTROLLER){
                let clickX = evt.pageX - canvas.offsetLeft;

                drawProgressController(canvas)(ctx)(type)(clickX);
                adjustVolume(player)(clickX / canvas.width);
            }
        });
        
        canvas.addEventListener('mousedown', evt => { 
            if(type === VOLUME_CONTROLLER){
                let clickX = evt.pageX - canvas.offsetLeft;
                isDraggingMap.set(type, true);

                if(clickX >= preXMap.get(type) - radius && clickX <= preXMap.get(type) + radius){
                    drawProgressController(canvas)(ctx)(type)(clickX);
                }
            }
        });
        
        canvas.addEventListener('mousemove', evt => {
            if(isDraggingMap.get(type)){
                let clickX = evt.pageX - canvas.offsetLeft;

                if(type === VOLUME_CONTROLLER){
                    drawProgressController(canvas)(ctx)(type)(clickX);
                    adjustVolume(player)(clickX / canvas.width);
                }
            }
        });
        
        canvas.addEventListener('mouseup', () => {
            isDraggingMap.set(type, false);
        });
        
        canvas.addEventListener('mouseout', () => {
            isDraggingMap.set(type, false);
            ctx.fillStyle= 'white';
            ctx.fill();
        });
        
        if(type === VOLUME_CONTROLLER){
            drawProgressController(canvas)(ctx)(type)(endMap.get(type));
        }else if(type === PROGRESS_CONTROLLER){
            drawProgressController(canvas)(ctx)(type)(startMap.get(type));
        }
    });
};

export const drawProgressController = canvas => ctx => type => posX => {
    const rectHeight = 4;
    const rectX = startMap.get(type);
    const rectY = canvas.height / 2 - rectHeight / 2;
    const arcY = canvas.height / 2;

    if(posX > endMap.get(type)) posX = endMap.get(type);
    if(posX < startMap.get(type)) posX = startMap.get(type);
    preXMap.set(type, posX);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = 'green';
    ctx.fillRect(rectX, rectY, posX - rectX, rectHeight);
    ctx.fillStyle = 'hsla(0, 100%, 100%, .5)';
    ctx.fillRect(posX, rectY, endMap.get(type) - posX, rectHeight);
    ctx.fillStyle = 'white';
    ctx.arc(posX, arcY, radius, 0, 360);
    ctx.fill();
    ctx.closePath();

    if(isDraggingMap.get(type)){
        ctx.beginPath();
        ctx.fillStyle= 'rgba(0, 0, 0, .5)';
        ctx.arc(posX, arcY, radius / 2, 0, 360);
        ctx.fill();
        ctx.closePath();
    }

    if(type === PROGRESS_CONTROLLER){
        ctx.beginPath();
        ctx.strokeStyle= 'white';
        ctx.font = '16px serif';
        progress && ctx.fillText(convertMSToMin(progress), 0, 20);
        totalTime && ctx.fillText(convertMSToMin(totalTime), 460, 20);
        ctx.fill();
        ctx.closePath();
    }
}

const step = type => duration => position => timestamp => {
    if(!startTime) startTime = timestamp;
    progress = timestamp - startTime + position;
    const percent = progress / duration;
    const canvas = canvasMap.get(type);
    const posX = (canvas.width - radius * 2 - textWidth * 2) * percent + radius + textWidth;

    drawProgressController(canvas)(ctxMap.get(type))(type)(posX);

    if(percent < 1){
        requestAnimationId = window.requestAnimationFrame(step(type)(duration)(position));
    }
}


export const animate = type => duration => position => {
    totalTime = duration;
    requestAnimationId = window.requestAnimationFrame(step(type)(duration)(position));
}

export const resetCanvas = type => {
    const canvas = canvasMap.get(type);
    window.cancelAnimationFrame(requestAnimationId);
    startTime = null;
    totalTime = 0;
    drawProgressController(canvas)(ctxMap.get(type))(type)(startMap.get(type));
}

export const cancelAnimation = () => {
    window.cancelAnimationFrame(requestAnimationId);
    startTime = null;
    totalTime = 0;
}

export const resumeAnimation = type => duration => position => {
    totalTime = duration;
    window.cancelAnimationFrame(requestAnimationId);
    startTime = null;
    requestAnimationId = window.requestAnimationFrame(step(type)(duration)(position));
}