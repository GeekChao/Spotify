import {VOLUME_CONTROLLER, PROGRESS_CONTROLLER} from '../../constants';
import {convertMSToMin} from '../../util/convertDate';
import Controller from '../../model/Controller';

let canvasArr;
const volumeController = new Controller();
const progressController = new Controller();
let startTime = null;
const radius = 8;
const textWidth = 50;
let requestAnimationId = null;
let progress = 0;
let totalTime = 0;

const adjustVolume = player => percent => {
    percent = percent < 0 ? 0 : percent;
    percent = percent > 1 ? 1 : percent;

    player.setVolume(percent);
};

export const initCanvas = player => {
    canvasArr = document.querySelectorAll('#canvas');
    canvasArr.forEach(canvas => {
        const ctx = canvas.getContext('2d');
        const type = canvas.getAttribute('type');

        if(type === VOLUME_CONTROLLER){
            volumeController.canvas = canvas;
            volumeController.context = ctx;
            volumeController.start = radius;
            volumeController.preX = canvas.width - radius;
            volumeController.end = canvas.width - radius;
        }else if(type === PROGRESS_CONTROLLER){
            progressController.canvas = canvas;
            progressController.context = ctx;
            progressController.start = radius + textWidth;
            progressController.preX = canvas.width - radius;
            progressController.end = canvas.width - radius - textWidth;
        }

        canvas.addEventListener('click', evt => {
            if(type === VOLUME_CONTROLLER){
                let clickX = evt.pageX - canvas.offsetLeft;

                drawProgressController(type)(clickX);
                adjustVolume(player)(clickX / canvas.width);
            }
        });
        
        canvas.addEventListener('mousedown', evt => { 
            if(type === VOLUME_CONTROLLER){
                let clickX = evt.pageX - canvas.offsetLeft;
                volumeController.isDragging = true;
                if(clickX >= volumeController.preX - radius && clickX <=volumeController.preX + radius){
                    drawProgressController(type)(clickX);
                }
            }
        });
        
        canvas.addEventListener('mousemove', evt => {
            if(volumeController.isDragging){
                let clickX = evt.pageX - canvas.offsetLeft;

                if(type === VOLUME_CONTROLLER){
                    drawProgressController(type)(clickX);
                    adjustVolume(player)(clickX / canvas.width);
                }
            }
        });
        
        canvas.addEventListener('mouseup', () => {
            volumeController.isDragging = false;
        });
        
        canvas.addEventListener('mouseout', () => {
            volumeController.isDragging = false;
            ctx.fillStyle= 'white';
            ctx.fill();
        });
        
        if(type === VOLUME_CONTROLLER){
            drawProgressController(type)(volumeController.end);
        }else if(type === PROGRESS_CONTROLLER){
            drawProgressController(type)(progressController.start);
        }
    });
};

export const drawProgressController = type => posX => {
    const controller = type === VOLUME_CONTROLLER ? volumeController : progressController;
    const rectHeight = 4;
    const rectX = controller.start;
    const rectY = controller.canvas.height / 2 - rectHeight / 2;
    const arcY = controller.canvas.height / 2;
    const ctx = controller.context;

    if(posX > controller.end) posX = controller.end;
    if(posX < controller.start) posX = controller.start;
    controller.preX = posX;
    
    ctx.clearRect(0, 0, controller.canvas.width, controller.canvas.height);
    ctx.beginPath();
    ctx.fillStyle = 'green';
    ctx.fillRect(rectX, rectY, posX - rectX, rectHeight);
    ctx.fillStyle = 'hsla(0, 100%, 100%, .5)';
    ctx.fillRect(posX, rectY, controller.end - posX, rectHeight);
    ctx.fillStyle = 'white';
    ctx.arc(posX, arcY, radius, 0, 360);
    ctx.fill();
    ctx.closePath();

    if(controller.isDragging){
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
    const controller = type === VOLUME_CONTROLLER ? volumeController : progressController;
    if(!startTime) startTime = timestamp;
    progress = timestamp - startTime + position;
    const percent = progress / duration;
    const canvas = controller.canvas;
    const posX = (canvas.width - radius * 2 - textWidth * 2) * percent + radius + textWidth;

    drawProgressController(type)(posX);

    if(percent < 1){
        requestAnimationId = window.requestAnimationFrame(step(type)(duration)(position));
    }
}


export const animate = type => duration => position => {
    totalTime = duration;
    requestAnimationId = window.requestAnimationFrame(step(type)(duration)(position));
}

export const resetCanvas = type => {
    const controller = type === VOLUME_CONTROLLER ? volumeController : progressController;
    window.cancelAnimationFrame(requestAnimationId);
    startTime = null;
    totalTime = 0;
    drawProgressController(type)(controller.start);
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