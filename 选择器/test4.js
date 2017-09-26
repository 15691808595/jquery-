function myAddEvent(obj, event,fn) {
    obj.addEventListener(event,fn,false);
}
function getByClass(oParen,sClass) {
    let aEle=oParen.getElementsByClassName(sClass);
    let result=[];
    for(let i=0;i<aEle.length;i++){
        if(aEle[i].className==sClass){
            result.push(aEle[i])
        }
    }
    return result;
}
function VQuery(ele) {
    this.elements=[];
    switch (typeof ele){
        case 'function':
            myAddEvent(window,'load',ele);
            break;
        case 'string':
            switch (ele.charAt(0)){
                case '#':
                    let obj=document.getElementById(ele.substring(1));
                    this.elements.push(obj);
                    break;
                case '.':
                    this.elements=getByClass(document,ele.substring(1));
                    break;
                default:
                    this.elements=document.getElementsByTagName(ele);
                    break;
            }
            break;
    }
}

VQuery.prototype.click=function (fn) {
    for(let i=0;i<this.elements.length;i++){
        myAddEvent(this.elements[i],'click',fn)
    }
};

function $(obj) {
    return new VQuery(obj);
}
