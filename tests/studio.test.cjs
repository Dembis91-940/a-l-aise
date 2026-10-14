const {readFileSync}=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const html=readFileSync(path.join(root,'app/index.html'),'utf8');
const base=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)][0][1];
const studio=readFileSync(path.join(root,'app/studio.js'),'utf8');
function boot(values={},blocked=false){
 const data={...values};const ctx=vm.createContext({document:{getElementById:()=>({}),addEventListener(){}},localStorage:{getItem:k=>data[k]??null,setItem(k,v){if(blocked)throw Error('blocked');data[k]=v;}}});
 vm.runInContext(base,ctx);vm.runInContext(studio,ctx);
 return {ctx,data,run:code=>vm.runInContext(code,ctx)};
}
const b=boot({'alaise-v1':JSON.stringify({done:['base','base','unknown'],notes:'Mon journal',viewed:[]})});
assert.equal(b.run('state.done.length'),1);assert.equal(b.run('state.notes'),'Mon journal');assert.equal(b.run('save()'),true);assert.equal(JSON.parse(b.data['alaise-v1']).notes,'Mon journal');
for(const corrupt of ['null','{bad','{"done":42,"notes":[],"viewed":false}']){const r=boot({'alaise-v1':corrupt,'alaise-studio-v1':corrupt});assert.equal(r.run('state.done.length'),0);assert.equal(r.run('studio.challenges.length'),0);}
const denied=boot({},true);assert.equal(denied.run('save()'),false);assert.equal(denied.run('saveStudio()'),false);
const stories=JSON.parse(b.run('JSON.stringify(STORIES)'));
let paths=0;
for(const s of stories){const reached=new Set();function walk(id,seen=[]){assert.ok(s.nodes[id],`${s.id}: missing node ${id}`);assert.ok(!seen.includes(id),'conversation loop');reached.add(id);const n=s.nodes[id];assert.ok(n.options.length>=2);for(const [text,feedback,next] of n.options){assert.ok(text&&feedback);if(next===null)paths++;else walk(next,[...seen,id]);}}walk(0);assert.equal(reached.size,s.nodes.length,'unreachable content');}
assert.equal(stories.length,4);assert.equal(b.run('CHALLENGES.length'),7);
assert.match(b.run("MODULES.find(m=>m.id==='consent').scenario.opts.find(o=>o.ok).t"),/arrête/);
assert.ok(!html.includes('Sur dix refus'));
console.log(`OK: migration, invalid storage, blocked storage, ${paths} conversation paths, consent regression.`);
