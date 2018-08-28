export default class Controller {
    get canvas(){
        return this.ccanvas;
    }

    set canvas(value){
        this.ccanvas = value;
    }

    get context(){
        return this.ccontext;
    }

    set context(value){
        this.ccontext = value;
    }

    set preX(value){
        this.cpreX = value;
    }

    get preX(){
        return this.cpreX;
    }

    get start(){
        return this.cstart;
    }

    set start(value){
        this.cstart = value;
    }

    get end(){
        return this.cend;
    }

    set end(value){
        this.cend = value;
    }

    get isDragging(){
        return this.cisDragging;
    }

    set isDragging(value){
        this.cisDragging = value;
    }
}