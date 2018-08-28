import {VOLUME_CONTROLLER, PROGRESS_CONTROLLER} from '../../constants';

let canvasArr;
let canvasMap = new Map();
let ctxMap = new Map();
let isDragging = false;
let preXMap = new Map(), endMap = new Map();
const radius = 8;
const start = radius;

const adjustVolume = player => percent => {
    percent = percent < 0 ? 0 : percent;
    percent = percent > 1 ? 1 : percent;

    player.setVolume(percent).then(() => {
        console.log(percent);
        console.log('Volume updated!');
    });
};

const initCanvas = player => {
    canvasArr = document.querySelectorAll('#canvas');
    canvasArr.forEach(canvas => {
        const ctx = canvas.getContext('2d');
        const type = canvas.getAttribute('type');
        ctxMap.set(type, canvas.getContext('2d'));
        canvasMap.set(type, canvas);
        preXMap.set(type, canvas.width - radius);
        endMap.set(type, canvas.width - radius);

        canvas.addEventListener('click', evt => {
            let clickX = evt.pageX - canvas.offsetLeft;
            if(type === VOLUME_CONTROLLER){
                drawVolumeController(canvas)(ctx)(type)(clickX);
                adjustVolume(player)(clickX / canvas.width);
            }
        });
        
        canvas.addEventListener('mousedown', evt => {
            let clickX = evt.pageX - canvas.offsetLeft;
            
            if(clickX >= preXMap.get(type) - radius && clickX <= preXMap.get(type) + radius){
                isDragging = true;
                if(type === VOLUME_CONTROLLER){
                    drawVolumeController(canvas)(ctx)(type)(clickX);
                }
            }
        });
        
        canvas.addEventListener('mousemove', evt => {
            if(isDragging){
                let clickX = evt.pageX - canvas.offsetLeft;
                if(type === VOLUME_CONTROLLER){
                    drawVolumeController(canvas)(ctx)(type)(clickX);
                    adjustVolume(player)(clickX / canvas.width);
                }
            }
        });
        
        canvas.addEventListener('mouseup', () => {
            isDragging = false;
        });
        
        canvas.addEventListener('mouseout', () => {
            isDragging = false;
            ctx.fillStyle= 'white';
            ctx.fill();
        });
        
        if(type === VOLUME_CONTROLLER){
            drawVolumeController(canvas)(ctx)(type)(endMap.get(type));
        }else if(type === PROGRESS_CONTROLLER){
            drawVolumeController(canvas)(ctx)(type)(start);
        }
    });
};

export const drawVolumeController = canvas => ctx => type => posX => {
    const rectHeight = 4;
    const rectX = start;
    const rectY = canvas.height / 2 - rectHeight / 2;
    const arcY = canvas.height / 2;

    if(posX > endMap.get(type)) posX = endMap.get(type);
    if(posX < start) posX = start;
    preXMap.set(type, posX);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = 'green';
    ctx.fillRect(rectX, rectY, posX, rectHeight);
    ctx.fillStyle = 'hsla(0, 100%, 100%, .5)';
    ctx.fillRect(rectX + posX, rectY, endMap.get(type) - posX, rectHeight);
    ctx.fillStyle = 'white';
    ctx.arc(posX, arcY, radius, 0, 360);
    ctx.fill();
    ctx.closePath();
    if(isDragging){
        ctx.beginPath();
        ctx.fillStyle= 'rgba(0, 0, 0, .5)';
        ctx.arc(posX, arcY, radius / 2, 0, 360);
        ctx.fill();
        ctx.closePath();
    }
}

export default initCanvas;