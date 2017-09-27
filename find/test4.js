function myAddEvent(obj, event,fn) {
    if(obj.attachEvent){
        obj.attachEvent('on'+event,function () {
            fn.call(obj)
        });
    }else {
        obj.addEventListener(event,fn,false);
    }
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
function getStyle(obj, attr) {
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else {
        return getComputedStyle(obj,false)[attr];
    }
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
        case 'object':
            this.elements.push(ele);
            break;
    }
}

VQuery.prototype.click=function (fn) {
    for(let i=0;i<this.elements.length;i++){
        myAddEvent(this.elements[i],'click',fn)
    }
};
VQuery.prototype.show=function () {
    for(let i=0;i<this.elements.length;i++){
        this.elements[i].style.display='block';
    }
};
VQuery.prototype.hide=function () {
    for(let i=0;i<this.elements.length;i++){
        this.elements[i].style.display='none';
    }
};
VQuery.prototype.toggle=function () {
    let _arguments=arguments;
    for(let i=0;i<this.elements.length;i++){
        (function (obj) {
            let count=0;
            myAddEvent(obj,'click',function () {
                _arguments[count++%_arguments.length].call(obj);
            })
        })(this.elements[i])
    }
};
VQuery.prototype.attr=function (attr,value) {
    if(arguments.length==2){
        for(let i=0;i<this.elements.length;i++){
            this.elements[i][attr]=value;
        }
    }else {
        return this.elements[0][attr];
    }
};
VQuery.prototype.hover=function (fnIn,fnOut) {
    for(let i=0;i<this.elements.length;i++){
        myAddEvent(this.elements[i],'mouseover',fnIn);
        myAddEvent(this.elements[i],'mouseout',fnOut);
    }
};
VQuery.prototype.css=function (attr,value) {
    if(arguments.length===2){
        for(let i=0;i<this.elements.length;i++){
            this.elements[i].style[attr]=value;
        }
    }else{
        return getStyle(this.elements[0],attr);
    }
};
VQuery.prototype.eq=function (num) {
    return $(this.elements[num])
};
function getArr(arr1,arr2) {
    for(let i=0;i<arr2.length;i++){
        arr1.push(arr2[i]);
    }
    return arr1;
}
VQuery.prototype.find=function (str) {
    let result=[];
    for(let i=0;i<this.elements.length;i++){
        switch (str.charAt(0)){
            case '.':
                let aEle=getByClass(this.elements[i],str.substring(1));
                getArr(result,aEle);
                break;
            default:
                let aEl=this.elements[i].getElementsByTagName(str);
                getArr(result,aEl);
                break;
        }
    }
    let newQuery=$();
    newQuery.elements=result;
    return newQuery;

};
VQuery.prototype.index=function () {
    // return $(this.elements[num])
};
function $(obj) {
    return new VQuery(obj);
}
