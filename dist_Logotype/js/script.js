!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.ssm=e()}(this,function(){"use strict";function t(t,e){t.forEach(function(t){return t(e)})}var e=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},n=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),i=[],o=function(){},s=function(){function s(t){e(this,s),this.id=t.id||Math.random().toString(36).substr(2,9),this.query=t.query||"all";if(this.options=Object.assign({},{onEnter:[],onLeave:[],onResize:[],onFirstRun:[]},t),"function"==typeof this.options.onEnter&&(this.options.onEnter=[this.options.onEnter]),"function"==typeof this.options.onLeave&&(this.options.onLeave=[this.options.onLeave]),"function"==typeof this.options.onResize&&(this.options.onResize=[this.options.onResize]),"function"==typeof this.options.onFirstRun&&(this.options.onFirstRun=[this.options.onFirstRun]),!1===this.testConfigOptions("once"))return this.valid=!1,!1;this.valid=!0,this.active=!1,this.init()}return n(s,[{key:"init",value:function(){var t=this;this.test=window.matchMedia(this.query),this.test.matches&&this.testConfigOptions("match")&&this.enterState(),this.listener=function(e){var n=!1;e.matches?t.testConfigOptions("match")&&(t.enterState(),n=!0):(t.leaveState(),n=!0),n&&o()},this.test.addListener(this.listener)}},{key:"enterState",value:function(){t(this.options.onFirstRun,this.eventData("firstRun")),t(this.options.onEnter,this.eventData("enter")),this.options.onFirstRun=[],this.active=!0}},{key:"leaveState",value:function(){t(this.options.onLeave,this.eventData("leave")),this.active=!1}},{key:"resizeState",value:function(){this.testConfigOptions("resize")&&t(this.options.onResize,this.eventData("resize"))}},{key:"destroy",value:function(){this.test.removeListener(this.listener)}},{key:"attachCallback",value:function(t,e,n){switch(t){case"enter":this.options.onEnter.push(e);break;case"leave":this.options.onLeave.push(e);break;case"resize":this.options.onResize.push(e)}"enter"===t&&n&&this.active&&e()}},{key:"testConfigOptions",value:function(t){var e=this,n=!0;return i.forEach(function(i){void 0!==e.options[i.name]&&i.when===t&&!1===i.test.bind(e)()&&(n=!1)}),n}},{key:"eventData",value:function(t){return{eventType:t,state:this}}}],[{key:"addConfigOption",value:function(t){i.push(t)}},{key:"getConfigOptions",value:function(){return i}},{key:"removeConfigOption",value:function(t){i.forEach(function(e,n){e.name===t&&i.splice(n,1)})}},{key:"setStateChangeMethod",value:function(t){if("function"!=typeof t)throw new Error("Not a function");o=t}}]),s}();return new(function(){function t(){e(this,t),this.states=[],this.resizeTimer=null,this.configOptions=[],window.addEventListener("resize",function(t){var e=this,n=void 0;return function(){for(var i=arguments.length,o=Array(i),s=0;s<i;s++)o[s]=arguments[s];n&&window.cancelAnimationFrame(n),n=window.requestAnimationFrame(function(){n=null,t.apply(e,o)})}}(this.resizeBrowser.bind(this)),!0)}return n(t,[{key:"addState",value:function(t){var e=new s(t);return e.valid&&this.states.push(e),e}},{key:"addStates",value:function(t){var e=this;t.forEach(function(t){return e.addState(t)})}},{key:"getState",value:function(t){return this.states.filter(function(e){return e.id===t})[0]||!1}},{key:"isActive",value:function(t){return(this.getState(t)||{}).active||!1}},{key:"getStates",value:function(t){var e=this;return void 0===t?this.states:t.map(function(t){return e.getState(t)})}},{key:"removeState",value:function(t){var e=this;this.states.forEach(function(n,i){n.id===t&&(n.destroy(),e.states.splice(i,1))})}},{key:"removeStates",value:function(t){var e=this;t.forEach(function(t){return e.removeState(t)})}},{key:"removeAllStates",value:function(){this.states.forEach(function(t){return t.destroy()}),this.states=[]}},{key:"addConfigOption",value:function(t){var e=t.name,n=void 0===e?"":e,i=t.test,o=void 0===i?null:i,a=t.when,r=void 0===a?"resize":a;""!==n&&null!==o&&s.addConfigOption({name:n,test:o,when:r})}},{key:"removeConfigOption",value:function(t){s.removeConfigOption(t)}},{key:"getConfigOptions",value:function(t){var e=s.getConfigOptions();return"string"==typeof t?e.filter(function(e){return e.name===t}):e}},{key:"resizeBrowser",value:function(){var t,e,n;(t=this.states,e="active",n=!0,t.filter(function(t){return t[e]&&t[e]===n})).forEach(function(t){t.resizeState()})}},{key:"stateChange",value:function(t){s.setStateChangeMethod(t)}}]),t}())});
//# sourceMappingURL=ssm.min.js.map


const toggleMenu = $('#toggle-menu');
const navMenu = $('#nav-menu');

toggleMenu.click(function(){
    const $this = $(this);
    let h;
    if(navMenu.is(':hidden')) {
        h = navMenu.show().height();
        navMenu.css('height', 0);
        navMenu.animate({'height': h}, 400,
            function(){
                $this.addClass('active');
            });
    } else {
        navMenu.animate({'height': 0}, 500, function(){
            $this.removeClass('active');
            navMenu.removeAttr('style').hide();
        });
    }
});
function initMobile() {
    $('body').addClass('is-mobile').removeClass('is-descktop');
    console.log("is-mobile");
}

function initDesktop() {
    $('body').addClass('is-desktop').removeClass('is-mobile');
    toggleMenu.removeClass('active');
    navMenu.removeAttr('style');
    console.log("is-desktop")
}

ssm.addState({
    id: 'tablet',
    query: '(max-width: 991.9px)',
    onEnter: function(){
        initMobile();
    }
});

ssm.addState({
    id: 'desktop',
    query: '(min-width: 992px)',
    onEnter: function(){
        initDesktop();
    }
});


$(document).ready(function(){

    $("#item1").click(function(){
        $("#dropdownlist").fadeToggle();
    });
});
