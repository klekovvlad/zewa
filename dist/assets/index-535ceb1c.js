(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function r(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=r(s);fetch(s.href,i)}})();const a={TOKEN:"6259676936:AAGZn7TwbVd-o4gQuqRpgASNgki89zKJCY8",CHAT_ID:"-1001891588574"},u={1:{title:"Проверь свои знания - получи скидку 40%",subtitle:"на продукцию <br> Zewa Natural Comfort"}},c={winner:{title:"Вы главный эксперт по гигиене!",subtitle:"Пока рядом верный помощник Zewa, будьте спокойны за свою гигиену!",promocode:"СилаZewa",desc:"Промокод дает право на скидку ??% на покупку ????? в период с 14 по 27 сентября 2023 года."},looser:{title:"Вы хорошо постарались!",subtitle:"Не обязательно быть экспертом по туалетной бумаге. Zewa не подведет и справится с любой задачей"}},l=[{question:"В наше время туалетная бумага является неизменным бытовым атрибутом. <br><br> Как думаете, сколько туалетной бумаги в год использует средний россиянин?",answers:[{text:"Менее 1 кг",true:0},{text:"1,5 кг",true:0},{text:"2,7 кг",true:1},{text:"5 кг",true:0}],message:"2,7 кг. туалетной бумаги приходится на одного россиянина в год в среднем. <br><br> Самая популярная туалетная бумага в России по данным продаж - трехслойная"},{question:"Как, по вашему, наносится ароматизатор на туалетную бумагу?",answers:[{text:"На начальных этапах производства - при подготовке бумажной основы",true:0},{text:"На втулку",true:1},{text:"На готовый рулон",true:0},{text:"На упаковку",true:0}],message:"Ароматизатор наносится на втулку - именно через неё бумагга приобретает аромат, не соприкосаясь с ароматизатором напрямую."},{question:"Где производится туалетная бумага Zewa?",answers:[{text:"В Швеции",true:0},{text:"В Китае",true:0},{text:"В России",true:1},{text:"В Турции",true:0}],message:"Вся туалетная бумага Zewa производится в России - на заводах в Тульской и Ленинградских областях."},{question:"Из чего, по вашему мнению, чаще всего производится туалетная бумага?",answers:[{text:"Из целлюлозы или переработанного волокна",true:1},{text:"Из волокон шелка",true:0},{text:"Из хлопка",true:0},{text:"Из камышового тростника",true:0}],message:"Основное сырье для произовства бумаги - это целлюлоза или переработанное волокно."},{question:"Каковы преимущества использования бумаги из переработанного волокна?",answers:[{text:"Не вырубаются новые деревья",true:0},{text:"Уменьшается углеродный след",true:0},{text:"Эффективно утилизируется сырье",true:0},{text:"Все перечисленные варианты",true:1}],message:"Выбор в пользу туалетной бумаги из переработанного волокна положительно влияет на экологию: для её произодства не вырубаются новые деревья, а значит, эффективно утилизируется сырьё и снижается углеродный след <br><br> Линейка трехслойной туалетной бумаги Natural Comfort изготовлена из 100% переработанных волокон и является осознанным выбором для заботы о семье и о природе"}],h=(e,t,r)=>{fetch(`https://api.telegram.org/bot${t}/sendMessage?chat_id=${r}&parse_mode=html&text=${e}`,{method:"POST",headers:{"Content-Type":"application/x-www-form-url"}})},d=e=>e.sort(()=>Math.random()-.5),g={app:document.querySelector(".app"),body:document.createElement("div"),live:3,page:0,questions:d(l),message:"",category_id:"3074457345616848733",init(){this.getPage(),this.body.classList.add("app-body");for(let e in this.getPagesText()[this.page])this.body.append(this.renderTextElement(e,this.getPagesText()[this.page][e]));this.app.append(this.renderTextElement("app-logo",""),this.body,this.renderButton("Начать")),this.buttonListener(document.querySelector(".button"))},buttonListener(e){e&&(e.onclick=()=>{this.body.className="app-body",this.page>0&&(e.textContent="Далее"),this.live>0&&this.page<this.questions.length+1?this.renderQuizPage():(e.textContent="К покупкам",this.live===0?(this.renderResultPage("looser"),this.message=`LOOSER ZEWA: ${this.page-1+(this.live-3)} из ${this.questions.length}`):(this.renderResultPage("winner"),this.message=`WINNER ZEWA: ${this.questions.length+(this.live-3)} из ${this.questions.length}`),h(this.message,a.TOKEN,a.CHAT_ID),e.onclick=()=>{window.location.href=`okeymobile://category?id=${this.category_id}`})})},getPrizes(){return c},getPagesText(){return u},mistake(){this.live--},getPage(){this.page++,this.app.dataset.page=this.page},renderTextElement(e,t){if(typeof t!="object"){const r=e==="button"?document.createElement("button"):document.createElement("div");return r.className=e,r.innerHTML=t,r}},renderButton(e){const t=document.createElement("button");return t.classList.add("button"),t.textContent=e,t},renderAnswers(e){const t=document.createElement("div");return t.classList.add("answers"),e.forEach((r,n)=>{const s=document.createElement("button");s.classList.add("answer"),s.textContent=r.text,s.dataset.id=n,t.append(s)}),t.onclick=r=>{this.checkAnswer(r.target)},t},checkAnswer(e){e.dataset.id&&(this.afterCheckAnswer(e,!!this.questions[this.page-2].answers[e.dataset.id].true),this.questions[this.page-2].answers[e.dataset.id].true||this.mistake())},afterCheckAnswer(e,t){e.classList.add(t),this.body.classList.add("hidden")},renderQuizPage(){this.getPage(),this.body.innerHTML="",this.body.append(this.renderTextElement("question",this.questions[this.page-2].question),this.renderAnswers(d(this.questions[this.page-2].answers)),this.renderTextElement("message",this.questions[this.page-2].message)),document.querySelector(".question").insertAdjacentHTML("afterbegin",this.renderProgress())},renderResultPage(e){this.app.dataset.page=8,this.body.innerHTML="";for(let t in this.getPrizes()[e])this.body.append(this.renderTextElement(t,this.getPrizes()[e][t]))},renderProgress(){return`
            <div class="app-progress">
                <span class="value">${this.page-1}</span>/${this.questions.length}
            </div>
        `}};g.init();
