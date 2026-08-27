/* ═══════════ DATA ═══════════ */
const TOPICS = [
  {
    id:'addition',icon:'➕',name:'Addition',
    desc:'Combine numbers to find their total sum',
    subtitle:'The foundation of all mathematics',
    formula:'a + b = Sum',
    formulaSub:'Adding two or more numbers gives the sum. The order doesn\'t matter (commutative property).',
    keyFacts:[
      {title:'Key Properties',body:'Commutative: a+b = b+a\nAssociative: (a+b)+c = a+(b+c)\nIdentity: a+0 = a'},
      {title:'Real World Use',body:'Calculating total cost of items, finding total distance, combining quantities in recipes.'}
    ],
    examples:[
      {q:'245 + 378',a:'623'},{q:'1,056 + 2,944',a:'4,000'},
      {q:'3.5 + 7.25',a:'10.75'},{q:'999 + 1',a:'1,000'}
    ],
    generate:(d)=>{
      const r=()=>d===0?rn(10):d===1?rn(100):rn(1000);
      const a=r(),b=r();
      return {q:`${a} + ${b}`,ans:a+b,display:`${a} <span class="op">+</span> ${b}`}
    }
  },
  {
    id:'subtraction',icon:'➖',name:'Subtraction',
    desc:'Find the difference between two numbers',
    subtitle:'Taking away and finding what remains',
    formula:'a − b = Difference',
    formulaSub:'Subtraction finds the difference. Unlike addition, order matters (not commutative).',
    keyFacts:[
      {title:'Key Properties',body:'NOT Commutative: a−b ≠ b−a\nIdentity: a−0 = a\nSelf: a−a = 0'},
      {title:'Real World Use',body:'Calculating change, finding how much more is needed, measuring distance between points.'}
    ],
    examples:[
      {q:'500 − 237',a:'263'},{q:'1,000 − 456',a:'544'},
      {q:'8.75 − 3.25',a:'5.50'},{q:'2,000 − 999',a:'1,001'}
    ],
    generate:(d)=>{
      const r=()=>d===0?rn(10):d===1?rn(100):rn(500);
      const b=r(),a=b+r();
      return {q:`${a} − ${b}`,ans:a-b,display:`${a} <span class="op">−</span> ${b}`}
    }
  },
  {
    id:'multiplication',icon:'✖️',name:'Multiplication',
    desc:'Repeated addition expressed compactly',
    subtitle:'The power of repeated addition',
    formula:'a × b = Product',
    formulaSub:'Multiplication is repeated addition. a × b means adding a to itself b times.',
    keyFacts:[
      {title:'Key Properties',body:'Commutative: a×b = b×a\nAssociative: (a×b)×c = a×(b×c)\nDistributive: a×(b+c) = ab+ac'},
      {title:'Real World Use',body:'Area calculation, scaling recipes, computing total cost of multiple items.'}
    ],
    examples:[
      {q:'24 × 15',a:'360'},{q:'125 × 8',a:'1,000'},
      {q:'32 × 25',a:'800'},{q:'99 × 99',a:'9,801'}
    ],
    generate:(d)=>{
      const a=d===0?rn(9)+1:d===1?rn(20)+2:rn(50)+2;
      const b=d===0?rn(9)+1:d===1?rn(20)+2:rn(30)+2;
      return {q:`${a} × ${b}`,ans:a*b,display:`${a} <span class="op">×</span> ${b}`}
    }
  },
  {
    id:'division',icon:'÷',name:'Division',
    desc:'Split into equal groups or find how many times',
    subtitle:'Sharing equally and finding ratios',
    formula:'a ÷ b = Quotient',
    formulaSub:'Division splits a number into equal parts. The result is called the quotient; the leftover is the remainder.',
    keyFacts:[
      {title:'Key Properties',body:'NOT Commutative: a÷b ≠ b÷a\nIdentity: a÷1 = a\nSelf: a÷a = 1\nZero: 0÷a = 0'},
      {title:'Real World Use',body:'Splitting a bill, finding speed (distance÷time), unit prices, sharing resources equally.'}
    ],
    examples:[
      {q:'144 ÷ 12',a:'12'},{q:'256 ÷ 8',a:'32'},
      {q:'1,000 ÷ 25',a:'40'},{q:'729 ÷ 27',a:'27'}
    ],
    generate:(d)=>{
      const b=d===0?rn(9)+1:d===1?pick([2,3,4,5,6,8,10,12]):pick([5,6,7,8,9,10,11,12,15,20]);
      const q=d===0?rn(9)+1:d===1?rn(20)+2:rn(50)+2;
      const a=b*q;
      return {q:`${a} ÷ ${b}`,ans:q,display:`${a} <span class="op">÷</span> ${b}`}
    }
  },
  {
    id:'ratio',icon:'⚖️',name:'Ratio',
    desc:'Compare two quantities in simplest form',
    subtitle:'Understanding proportional relationships',
    formula:'a : b = a/b',
    formulaSub:'A ratio compares two quantities. Simplify by dividing both by their GCD (Greatest Common Divisor).',
    keyFacts:[
      {title:'Simplifying Ratios',body:'Find GCD of both numbers, then divide each by it.\nExample: 12:8 → GCD=4 → 3:2'},
      {title:'Real World Use',body:'Map scales, mixing paint/concrete, cooking proportions, speed ratios, financial analysis.'}
    ],
    examples:[
      {q:'Simplify 12 : 8',a:'3 : 2'},{q:'Simplify 15 : 25',a:'3 : 5'},
      {q:'Simplify 100 : 75',a:'4 : 3'},{q:'Simplify 36 : 24',a:'3 : 2'}
    ],
    generate:(d)=>{
      const factors=d===0?[2,3,4,5]:d===1?[4,5,6,8,10]:pick([[12,15,20],[6,8,10,12,15]]);
      const factor=Array.isArray(factors)?pick(factors):rn(5)+2;
      const a=(rn(8)+1)*factor,b=(rn(8)+1)*factor;
      const g=gcd(a,b);
      return {q:`Simplify ${a} : ${b}`,ans:`${a/g}:${b/g}`,display:`Simplify <span class="op">${a} : ${b}</span>`,type:'text'}
    }
  },
  {
    id:'square',icon:'²',name:'Squares',
    desc:'Multiply a number by itself',
    subtitle:'The power of self-multiplication',
    formula:'n² = n × n',
    formulaSub:'The square of a number is that number multiplied by itself. Geometrically, it\'s the area of a square with side n.',
    keyFacts:[
      {title:'Perfect Squares',body:'1,4,9,16,25,36,49,64,81,100,121,144,169,196,225,256,289,324,361,400'},
      {title:'Properties',body:'Always positive (or zero)\nn²=(−n)²\n(a+b)²=a²+2ab+b²\n(a−b)²=a²−2ab+b²'}
    ],
    examples:[
      {q:'15² = ?',a:'225'},{q:'24² = ?',a:'576'},
      {q:'31² = ?',a:'961'},{q:'50² = ?',a:'2,500'}
    ],
    learnTable:true,tableType:'square',
    generate:(d)=>{
      const n=d===0?rn(9)+1:d===1?rn(15)+6:rn(25)+6;
      return {q:`${n}²`,ans:n*n,display:`${n}<sup style="font-size:0.6em">2</sup>`}
    }
  },
  {
    id:'squareroot',icon:'√',name:'Square Root',
    desc:'Find what number was squared to get this',
    subtitle:'The inverse of squaring',
    formula:'√n = x, where x² = n',
    formulaSub:'The square root of n is the number that, when multiplied by itself, gives n. Only perfect squares have whole number roots.',
    keyFacts:[
      {title:'Common Roots',body:'√1=1, √4=2, √9=3, √16=4, √25=5\n√36=6, √49=7, √64=8, √81=9, √100=10'},
      {title:'Properties',body:'√(a×b) = √a × √b\n√(a/b) = √a / √b\n√(n²) = n\n(√n)² = n'}
    ],
    examples:[
      {q:'√196',a:'14'},{q:'√289',a:'17'},
      {q:'√625',a:'25'},{q:'√1024',a:'32'}
    ],
    generate:(d)=>{
      const max=d===0?10:d===1?20:30;
      const n=rn(max)+1;
      return {q:`√${n*n}`,ans:n,display:`<span class="op">√</span>${n*n}`}
    }
  },
  {
    id:'cube',icon:'³',name:'Cubes',
    desc:'Multiply a number by itself three times',
    subtitle:'Three-dimensional multiplication',
    formula:'n³ = n × n × n',
    formulaSub:'The cube of a number is it multiplied by itself twice. Geometrically, it\'s the volume of a cube with side n.',
    keyFacts:[
      {title:'Perfect Cubes',body:'1³=1, 2³=8, 3³=27, 4³=64, 5³=125\n6³=216, 7³=343, 8³=512, 9³=729, 10³=1000'},
      {title:'Properties',body:'(−n)³ = −n³\n(a+b)³ = a³+3a²b+3ab²+b³\nCubes can be negative'}
    ],
    examples:[
      {q:'7³ = ?',a:'343'},{q:'12³ = ?',a:'1,728'},
      {q:'15³ = ?',a:'3,375'},{q:'20³ = ?',a:'8,000'}
    ],
    learnTable:true,tableType:'cube',
    generate:(d)=>{
      const n=d===0?rn(5)+1:d===1?rn(10)+1:rn(15)+2;
      return {q:`${n}³`,ans:n*n*n,display:`${n}<sup style="font-size:0.6em">3</sup>`}
    }
  },
  {
    id:'cuberoot',icon:'∛',name:'Cube Root',
    desc:'Find what number was cubed to get this',
    subtitle:'The inverse of cubing',
    formula:'∛n = x, where x³ = n',
    formulaSub:'The cube root of n is the number that, when cubed, equals n. Unlike square roots, cube roots can be negative.',
    keyFacts:[
      {title:'Common Cube Roots',body:'∛1=1, ∛8=2, ∛27=3, ∛64=4, ∛125=5\n∛216=6, ∛343=7, ∛512=8, ∛729=9, ∛1000=10'},
      {title:'Properties',body:'∛(a×b) = ∛a × ∛b\n∛(n³) = n\n∛(−n) = −∛n'}
    ],
    examples:[
      {q:'∛1331',a:'11'},{q:'∛2197',a:'13'},
      {q:'∛3375',a:'15'},{q:'∛8000',a:'20'}
    ],
    generate:(d)=>{
      const max=d===0?5:d===1?10:15;
      const n=rn(max)+1;
      return {q:`∛${n*n*n}`,ans:n,display:`<span class="op">∛</span>${n*n*n}`}
    }
  },
  {
    id:'tables',icon:'📊',name:'Tables',
    desc:'Master multiplication tables from 1 to 20',
    subtitle:'The backbone of mental arithmetic',
    formula:'n × m = Product',
    formulaSub:'Multiplication tables are the building blocks of mental math. Mastering 1–20 unlocks rapid calculation.',
    keyFacts:[
      {title:'Tips to Memorize',body:'× 2: Double the number\n× 5: Ends in 0 or 5\n× 9: Digits always sum to 9\n× 11: Repeat digit (up to 9)'},
      {title:'Pattern Tricks',body:'× 10: Add a zero\n× 4: Double, then double again\n× 8: Double three times\n× 6: Half the number × 12'}
    ],
    examples:[
      {q:'7 × 8',a:'56'},{q:'9 × 12',a:'108'},
      {q:'13 × 7',a:'91'},{q:'15 × 15',a:'225'}
    ],
    learnTable:true,tableType:'times',
    generate:(d)=>{
      const a=d===0?rn(10)+1:d===1?rn(12)+1:rn(20)+1;
      const b=d===0?rn(10)+1:d===1?rn(12)+1:rn(20)+1;
      return {q:`${a} × ${b}`,ans:a*b,display:`${a} <span class="op">×</span> ${b}`}
    }
  },
  {
    id:'fraction',icon:'½',name:'Fractions',
    desc:'Parts of a whole — add, subtract & simplify',
    subtitle:'Understanding parts of a whole',
    formula:'a/b — Numerator over Denominator',
    formulaSub:'A fraction represents part of a whole. The top number (numerator) is the part; the bottom (denominator) is the total parts.',
    keyFacts:[
      {title:'Operations',body:'Add/Sub: Find common denominator\nMultiply: Multiply across (a/b × c/d = ac/bd)\nDivide: Flip & multiply (a/b ÷ c/d = ad/bc)'},
      {title:'Types',body:'Proper: numerator < denominator (3/4)\nImproper: numerator ≥ denominator (7/3)\nMixed: whole + fraction (2⅓)'}
    ],
    examples:[
      {q:'1/2 + 1/3',a:'5/6'},{q:'3/4 − 1/4',a:'2/4 = 1/2'},
      {q:'2/3 × 3/4',a:'6/12 = 1/2'},{q:'3/4 ÷ 3/8',a:'2'}
    ],
    generate:(d)=>{
      const denoms=[2,3,4,5,6,8,10];
      const d1=pick(denoms),d2=pick(denoms);
      const n1=rn(d1-1)+1,n2=rn(d2-1)+1;
      const lcd=lcm(d1,d2);
      const sumN=n1*(lcd/d1)+n2*(lcd/d2);
      const g=gcd(sumN,lcd);
      const ansN=sumN/g,ansD=lcd/g;
      return {q:`${n1}/${d1} + ${n2}/${d2}`,ans:ansD===1?`${ansN}`:`${ansN}/${ansD}`,display:`<span class="op">${n1}/${d1}</span> + <span class="op">${n2}/${d2}</span>`,type:'text'}
    }
  },
  {
    id:'percentage',icon:'%',name:'Percentage',
    desc:'Express values as parts of 100',
    subtitle:'Per cent — out of one hundred',
    formula:'% = (Part ÷ Whole) × 100',
    formulaSub:'Percentage means "per hundred". To find X% of Y: (X/100) × Y. To find what % X is of Y: (X/Y) × 100.',
    keyFacts:[
      {title:'Key Formulas',body:'X% of Y = (X×Y)/100\nY increased by X% = Y×(1+X/100)\nY decreased by X% = Y×(1−X/100)'},
      {title:'Quick Conversions',body:'50% = 1/2, 25% = 1/4, 75% = 3/4\n20% = 1/5, 10% = 1/10, 1% = 1/100\n33.33% ≈ 1/3, 66.67% ≈ 2/3'}
    ],
    examples:[
      {q:'15% of 200',a:'30'},{q:'25% of 480',a:'120'},
      {q:'8 is what % of 40',a:'20%'},{q:'Find 12.5% of 800',a:'100'}
    ],
    generate:(d)=>{
      const percents=d===0?[10,20,25,50]:d===1?[5,10,15,20,25,30,40,50,75]:[ 5,10,12,15,20,25,30,35,40,45,50,60,75,80];
      const p=pick(percents);
      const base=d===0?pick([10,20,40,50,100]):d===1?pick([40,50,80,100,200]):pick([100,120,150,200,250,300,400,500]);
      const ans=p*base/100;
      return {q:`${p}% of ${base}`,ans:ans,display:`<span class="op">${p}%</span> of ${base}`}
    }
  }
];

/* ═══════════ HELPERS ═══════════ */
function rn(n){return Math.floor(Math.random()*n)+1}
function pick(arr){return arr[Math.floor(Math.random()*arr.length)]}
function gcd(a,b){return b===0?a:gcd(b,a%b)}
function lcm(a,b){return a*b/gcd(a,b)}

/* ═══════════ STATE ═══════════ */
let totalScore=0;
let currentTopic=null;
let currentQ=null;
let qCount=0,correct=0,wrong=0;
let difficulty=1;
let answered=false;
let usedQuestions=new Set();

/* ═══════════ HOME ═══════════ */
function buildHome(){
  const grid=document.getElementById('topicGrid');
  grid.innerHTML=TOPICS.map(t=>`
    <div class="topic-card" onclick="openTopic('${t.id}')">
      <span class="topic-icon">${t.icon}</span>
      <div class="topic-name">${t.name}</div>
      <div class="topic-desc">${t.desc}</div>
      <div class="topic-arrow">↗</div>
    </div>
  `).join('');
}

function showHome(){
  document.getElementById('home').classList.add('active');
  document.getElementById('topic-page').classList.remove('active');
  document.getElementById('homeScore').textContent=totalScore;
}

/* ═══════════ TOPIC ═══════════ */
function openTopic(id){
  currentTopic=TOPICS.find(t=>t.id===id);
  if(!currentTopic)return;
  qCount=0;correct=0;wrong=0;difficulty=1;answered=false;
  usedQuestions=new Set();

  document.getElementById('home').classList.remove('active');
  document.getElementById('topic-page').classList.add('active');

  document.getElementById('topicEmoji').textContent=currentTopic.icon;
  document.getElementById('topicTitle').textContent=currentTopic.name;
  document.getElementById('topicSubtitle').textContent=currentTopic.subtitle;

  buildLearnPanel();
  buildPracticePanel();
  switchTab('learn');
}

function buildLearnPanel(){
  const t=currentTopic;
  let html=`
    <div class="formula-box">
      <div class="formula-label">Formula</div>
      <div class="formula-text">${t.formula}</div>
      <div class="formula-sub">${t.formulaSub}</div>
    </div>
    <div class="learn-body">
      ${t.keyFacts.map(f=>`
        <div class="info-card">
          <h4>${f.title}</h4>
          <p>${f.body.replace(/\n/g,'<br>')}</p>
        </div>
      `).join('')}
    </div>`;

  // Special table for squares / cubes / times tables
  if(t.learnTable){
    if(t.tableType==='square'){
      html+=`<div class="examples-section"><h3>Square Reference Table</h3>
        <table class="ref-table"><tr><th>n</th><th>n²</th><th>n</th><th>n²</th></tr>`;
      for(let i=1;i<=20;i+=2){
        html+=`<tr><td>${i}</td><td style="color:var(--gold2);font-weight:600">${i*i}</td><td>${i+1}</td><td style="color:var(--gold2);font-weight:600">${(i+1)*(i+1)}</td></tr>`;
      }
      html+=`</table></div>`;
    } else if(t.tableType==='cube'){
      html+=`<div class="examples-section"><h3>Cube Reference Table</h3>
        <table class="ref-table"><tr><th>n</th><th>n³</th><th>n</th><th>n³</th></tr>`;
      for(let i=1;i<=20;i+=2){
        html+=`<tr><td>${i}</td><td style="color:var(--gold2);font-weight:600">${i*i*i}</td><td>${i+1}</td><td style="color:var(--gold2);font-weight:600">${(i+1)*(i+1)*(i+1)}</td></tr>`;
      }
      html+=`</table></div>`;
    } else if(t.tableType==='times'){
      html+=`<div class="examples-section"><h3>Multiplication Tables (1–20)</h3>
        <div class="tables-grid">`;
      for(let n=1;n<=20;n++){
        html+=`<div class="table-card"><div class="table-title">Table of ${n}</div>`;
        for(let m=1;m<=10;m++){
          html+=`<div class="table-row"><span>${n} × ${m}</span><span class="result">= ${n*m}</span></div>`;
        }
        html+=`</div>`;
      }
      html+=`</div></div>`;
    }
  }

  html+=`<div class="examples-section" style="margin-top:28px"><h3>Worked Examples</h3>
    ${t.examples.map(e=>`
      <div class="example-row">
        <div class="ex-num">${e.q}</div>
        <div class="ex-ans">= ${e.a}</div>
      </div>
    `).join('')}
  </div>`;

  document.getElementById('learnPanel').innerHTML=html;
}

function buildPracticePanel(){
  const panel=document.getElementById('practicePanel');
  panel.innerHTML=`
    <div class="practice-hud">
      <div class="hud-card"><div class="hud-val gold" id="pScore">0</div><div class="hud-label">Score</div></div>
      <div class="hud-card"><div class="hud-val green" id="pCorrect">0</div><div class="hud-label">Correct</div></div>
      <div class="hud-card"><div class="hud-val red" id="pWrong">0</div><div class="hud-label">Wrong</div></div>
      <div class="hud-card"><div class="hud-val" id="pQ">0</div><div class="hud-label">Attempted</div></div>
    </div>
    <div class="diff-row">
      <span style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--muted);align-self:center;margin-right:4px">Difficulty:</span>
      <button class="diff-btn" onclick="setDiff(0)">Easy</button>
      <button class="diff-btn active" onclick="setDiff(1)">Medium</button>
      <button class="diff-btn" onclick="setDiff(2)">Hard</button>
    </div>
    <div class="progress-wrap"><div class="progress-bar" id="progressBar" style="width:0%"></div></div>
    <div id="qArea"></div>
  `;
  nextQuestion();
}

function setDiff(d){
  difficulty=d;
  usedQuestions=new Set();
  document.querySelectorAll('.diff-btn').forEach((b,i)=>{
    b.classList.toggle('active',i===d);
  });
  nextQuestion();
}

function switchTab(tab){
  document.querySelectorAll('.tab-btn').forEach((b,i)=>{
    b.classList.toggle('active',(i===0&&tab==='learn')||(i===1&&tab==='practice'));
  });
  document.getElementById('learnPanel').classList.toggle('active',tab==='learn');
  document.getElementById('practicePanel').classList.toggle('active',tab==='practice');
}

/* ═══════════ PRACTICE LOGIC ═══════════ */
function nextQuestion(){
  answered=false;

  // Keep generating until we get a question not seen this session.
  // If the pool for this topic/difficulty runs dry, reset and start a fresh cycle.
  let attempts=0;
  do{
    currentQ=currentTopic.generate(difficulty);
    attempts++;
    if(attempts>40){ usedQuestions=new Set(); break; }
  } while(usedQuestions.has(currentQ.q));
  usedQuestions.add(currentQ.q);

  qCount++;

  const isText=currentQ.type==='text';
  const qArea=document.getElementById('qArea');

  let qHtml=`
    <div class="question-card">
      <div class="q-number">Question ${qCount}</div>
      <div class="q-text">${currentQ.display||currentQ.q}</div>`;

  if(isText){
    qHtml+=`
      <div class="answer-row">
        <input class="answer-input" id="ansInput" placeholder="Type your answer..." autocomplete="off" onkeydown="if(event.key==='Enter')checkAnswer()">
        <button class="btn-check" onclick="checkAnswer()">Check</button>
      </div>`;
  } else {
    // Generate MCQ options
    const correct=currentQ.ans;
    const options=genOptions(correct,currentTopic.id);
    qHtml+=`<div class="options-grid" id="optGrid">
      ${options.map(o=>`<button class="opt-btn" onclick="checkMCQ(this,'${o}')">${o}</button>`).join('')}
    </div>`;
  }
  qHtml+=`</div>`;

  qHtml+=`
    <div class="feedback-bar" id="feedbackBar"></div>`;

  qArea.innerHTML=qHtml;
  if(!isText) return;
  setTimeout(()=>document.getElementById('ansInput')?.focus(),100);
}

function genOptions(correct,topicId){
  const n=Number(correct);
  let opts=[correct];
  while(opts.length<4){
    let fake;
    if(!isNaN(n)){
      const delta=Math.max(1,Math.round(n*0.1));
      fake=String(n+rn(delta*4)-delta*2);
      if(fake===String(correct)||opts.includes(fake)||Number(fake)<0)continue;
    } else {
      // ratio / fraction — generate nearby wrong answers
      const parts=String(correct).split(':');
      if(parts.length===2){
        const a=Number(parts[0]),b=Number(parts[1]);
        fake=`${a+rn(3)}:${b+rn(3)}`;
        if(fake===correct||opts.includes(fake))continue;
      } else {
        break; // fall through to text
      }
    }
    opts.push(fake);
  }
  return shuffle(opts);
}

function shuffle(arr){
  return arr.sort(()=>Math.random()-0.5);
}

function checkMCQ(btn,val){
  if(answered)return;
  answered=true;
  const isCorrect=String(val)===String(currentQ.ans);
  showFeedback(isCorrect,currentQ.ans);
  btn.classList.add(isCorrect?'correct':'wrong');
  if(!isCorrect){
    document.querySelectorAll('.opt-btn').forEach(b=>{
      if(String(b.textContent)===String(currentQ.ans))b.classList.add('correct');
    });
  }
  document.querySelectorAll('.opt-btn').forEach(b=>b.disa