/* Grading and scientific expression evaluation. No eval / Function execution. */
(function(root){
 'use strict';
 function numeric(value){if(typeof value!=='string'&&typeof value!=='number')return null;const s=String(value).trim();if(!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(s))return null;const n=Number(s);return Number.isFinite(n)?n:null;}
 function grade(q,response,scheme='gate2'){
  const marks=scheme==='gate1'?1:scheme==='ese'?2:2;
  const attempted=q.type==='NAT'?String(response??'').trim()!=='':Array.isArray(response)?response.length>0:!!response;
  if(!attempted)return {status:'skipped',score:0,max:marks};
  let correct=false;
  if(q.type==='NAT'){const n=numeric(response);if(n===null)return {status:'invalid',score:0,max:marks};correct=n>=q.range[0]-1e-10&&n<=q.range[1]+1e-10;}
  else if(q.type==='MSQ'){const selected=Array.isArray(response)?[...new Set(response)].sort():[];correct=selected.length===q.key.length&&selected.every((v,i)=>v===[...q.key].sort()[i]);}
  else correct=q.key.includes(response);
  return {status:correct?'correct':'wrong',score:correct?marks:q.type==='MCQ'?-marks/3:0,max:marks};
 }
 function evaluate(source,options={}){
  if(typeof source!=='string'||source.length>500)throw Error('Enter an expression of at most 500 characters.');
  const text=source.replace(/×/g,'*').replace(/÷/g,'/').replace(/−/g,'-').replace(/π/g,'pi').replace(/\s/g,'');
  const tokens=text.match(/(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?|[a-zA-Z]+|[()+\-*/^!,]/g)||[];
  if(tokens.join('')!==text||!tokens.length)throw Error('Use numbers, supported functions and operators.');
  let pos=0,depth=0;const deg=options.angle!=='RAD';const constants={pi:Math.PI,e:Math.E,Ans:Number(options.ans||0),M:Number(options.memory||0)};
  const angle=x=>deg?x*Math.PI/180:x;const inverse=x=>deg?x*180/Math.PI:x;
  const fn={sin:x=>Math.sin(angle(x)),cos:x=>Math.cos(angle(x)),tan:x=>{const a=angle(x);if(Math.abs(Math.cos(a))<1e-14)throw Error('Tangent is undefined at this angle.');return Math.tan(a);},asin:x=>inverse(Math.asin(x)),acos:x=>inverse(Math.acos(x)),atan:x=>inverse(Math.atan(x)),sinh:Math.sinh,cosh:Math.cosh,tanh:Math.tanh,ln:Math.log,log:Math.log10,sqrt:Math.sqrt,abs:Math.abs,exp:Math.exp,pow:(a,b)=>a**b};
  function atom(){if(++depth>80)throw Error('Expression is too deeply nested.');let v;const t=tokens[pos++];if(t==='('){v=sum();if(tokens[pos++]!==')')throw Error('Close the parentheses.');}else if(Object.hasOwn(constants,t)){v=constants[t];}else if(Object.hasOwn(fn,t)){if(tokens[pos++]!=='(')throw Error('Functions need parentheses.');const args=[sum()];while(tokens[pos]===','){pos++;args.push(sum());}if(tokens[pos++]!==')')throw Error('Close the function parentheses.');if(args.length!==(t==='pow'?2:1))throw Error('Wrong number of function arguments.');v=fn[t](...args);}else if(t&&numeric(t)!==null)v=Number(t);else throw Error('Incomplete expression or unknown function.');depth--;while(tokens[pos]==='!'){pos++;if(!Number.isInteger(v)||v<0||v>170)throw Error('Factorial requires an integer from 0 to 170.');let f=1;for(let i=2;i<=v;i++)f*=i;v=f;}return v;}
  function power(){let v=atom();if(tokens[pos]==='^'){pos++;v=v**unary();}return v;}
  function unary(){if(tokens[pos]==='+'){pos++;return unary();}if(tokens[pos]==='-'){pos++;return -unary();}return power();}
  function product(){let v=unary();while(tokens[pos]==='*'||tokens[pos]==='/'){const op=tokens[pos++],w=unary();if(op==='/'&&w===0)throw Error('Cannot divide by zero.');v=op==='*'?v*w:v/w;}return v;}
  function sum(){let v=product();while(tokens[pos]==='+'||tokens[pos]==='-'){const op=tokens[pos++],w=product();v=op==='+'?v+w:v-w;}return v;}
  const result=sum();if(pos!==tokens.length)throw Error('Use * between terms; check the expression.');if(!Number.isFinite(result))throw Error('The result is outside the real finite range.');return Math.abs(result)<1e-14?0:result;
 }
 function convert(value,category,from,to){const n=numeric(value);if(n===null)throw Error('Enter a valid number.');const factors={length:{m:1,cm:.01,mm:.001,in:.0254,ft:.3048},power:{W:1,kW:1000,'J/s':1,'kJ/hr':1000/3600},energy:{J:1,kJ:1000,MJ:1e6,kWh:3.6e6},pressure:{Pa:1,kPa:1000,MPa:1e6,bar:1e5,atm:101325}};if(category==='temperature'){const kelvin=from==='K'?n:from==='°C'?n+273.15:(n-32)*5/9+273.15;if(kelvin<0)throw Error('Temperature cannot be below absolute zero.');return to==='K'?kelvin:to==='°C'?kelvin-273.15:(kelvin-273.15)*9/5+32;}const f=factors[category];if(!f||!f[from]||!f[to])throw Error('Unsupported unit.');return n*f[from]/f[to];}
 const api={numeric,grade,evaluate,convert};root.LabEngine=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
