/* TV Aberta Brasil — catálogo oficial, revisão documental 2026-10-15.
   O acesso à página oficial não garante vídeo ao vivo em todas as localidades. */
(function(root){
'use strict';
const channels=[
{id:'globo',name:'TV Globo',region:'BR',category:'Generalista',url:'https://globoplay.globo.com/tv-globo/ao-vivo/7832875/',note:'Sinal local via Globoplay. Conta gratuita e localização podem ser necessárias.',tone:'#1671ef',initials:'G',featured:true,access:'Conta/localização'},
{id:'sbt',name:'SBT',region:'BR',category:'Generalista',url:'https://www.sbt.com.br/ao-vivo',note:'Transmissão oficial na página Ao Vivo.',tone:'#3479f5',initials:'SBT',featured:true,access:'Portal oficial'},
{id:'band',name:'Band',region:'BR',category:'Generalista',url:'https://www.band.com.br/ao-vivo',note:'Página oficial com opções de sinal por praça.',tone:'#cb1b5a',initials:'B',featured:true,access:'Portal oficial'},
{id:'record',name:'Record',region:'BR',category:'Generalista',url:'https://record.r7.com/',note:'Transmissão ao vivo pelo RecordPlus em modalidade gratuita, sob regras do serviço.',tone:'#e53e50',initials:'R',featured:true,access:'Conta pode ser necessária'},
{id:'redetv',name:'RedeTV!',region:'BR',category:'Generalista',url:'https://www.redetv.uol.com.br/aovivo/',note:'Página oficial de transmissão ao vivo.',tone:'#08a5b5',initials:'RT',featured:true,access:'Portal oficial'},
{id:'cultura',name:'TV Cultura',region:'SP',category:'Educação e cultura',url:'https://cultura.uol.com.br/aovivo/',note:'Página oficial de transmissão ao vivo.',tone:'#8854d7',initials:'C',featured:true,access:'Portal oficial'},
{id:'tvbrasil',name:'TV Brasil',region:'BR',category:'Pública e legislativa',url:'https://tvbrasil.ebc.com.br/webtv/',note:'O sinal web pode suspender programas por restrições de direitos digitais.',tone:'#179d8d',initials:'TB',featured:true,access:'Programação parcial'},
{id:'camara',name:'TV Câmara',region:'BR',category:'Pública e legislativa',url:'https://www.camara.leg.br/tv/',note:'Sessões e programação legislativa no site da Câmara.',tone:'#2674bd',initials:'CD',featured:false,access:'Portal oficial'},
{id:'senado',name:'TV Senado',region:'BR',category:'Pública e legislativa',url:'https://www12.senado.leg.br/tv/',note:'Transmissões e sessões legislativas no portal do Senado.',tone:'#287c71',initials:'SF',featured:false,access:'Portal oficial'},
{id:'justica',name:'TV Justiça',region:'BR',category:'Pública e legislativa',url:'https://portal.stf.jus.br/comunicacao/',note:'Página de comunicação do STF com acesso à TV Justiça.',tone:'#7767bf',initials:'TJ',featured:false,access:'Acesso pelo STF'},
{id:'canalgov',name:'Canal Gov',region:'BR',category:'Pública e legislativa',url:'https://canalgov.ebc.com.br/ao-vivo',note:'Transmissão oficial do Poder Executivo.',tone:'#2188be',initials:'CG',featured:false,access:'Portal oficial'},
{id:'gazeta',name:'TV Gazeta',region:'SP',category:'Generalista',url:'https://www.tvgazeta.com.br/aovivo/',note:'Transmissão online oficial da TV Gazeta.',tone:'#dc7642',initials:'GZ',featured:false,access:'Portal oficial'},
{id:'redevida',name:'REDEVIDA',region:'BR',category:'Religioso',url:'https://www.redevida.com.br/ao-vivo/',note:'Programação ao vivo pelo portal oficial.',tone:'#4187cb',initials:'RV',featured:false,access:'Portal oficial'},
{id:'cancaonova',name:'TV Canção Nova',region:'BR',category:'Religioso',url:'https://tv.cancaonova.com/TV-AO-VIVO/',note:'Transmissão oficial com player alternativo.',tone:'#219bb5',initials:'CN',featured:false,access:'Portal oficial'},
{id:'aparecida',name:'TV Aparecida',region:'BR',category:'Religioso',url:'https://www.a12.com/tv',note:'A emissora oferece acesso ao vivo e proíbe retransmissão sem autorização.',tone:'#588cc4',initials:'TA',featured:false,access:'Portal oficial'},
{id:'novotempo',name:'TV Novo Tempo',region:'BR',category:'Religioso',url:'https://www.novotempo.com/',note:'A página inicial tem acesso ao sinal da TV Novo Tempo.',tone:'#35a5a0',initials:'NT',featured:false,access:'Portal oficial'},
{id:'banddf',name:'Band Brasília',region:'DF',category:'Regional',url:'https://www.band.com.br/ao-vivo/band-brasilia',note:'Transmissão regional de Brasília e entorno.',tone:'#c93762',initials:'BDF',featured:false,access:'Portal oficial'},
{id:'bandvale',name:'Band Vale',region:'SP',category:'Regional',url:'https://www.band.com.br/ao-vivo/band-vale',note:'Transmissão regional do Vale do Paraíba.',tone:'#b73f67',initials:'BV',featured:false,access:'Portal oficial'},
{id:'camaradf',name:'TV Câmara Distrital',region:'DF',category:'Pública e legislativa',url:'https://www.cl.df.gov.br/web/tv-camara-distrital',note:'Canal da Câmara Legislativa do DF, com acesso a transmissões oficiais.',tone:'#348b78',initials:'CL',featured:false,access:'Link para transmissão'},
{id:'redeminas',name:'Rede Minas',region:'MG',category:'Educação e cultura',url:'https://redeminas.tv/',note:'Página institucional com informações de sintonização; sinal web não confirmado.',tone:'#bc834d',initials:'RM',featured:false,access:'Portal / verificar sinal'}
];

/* Fontes para player interno: códigos de incorporação publicados pela emissora
   ou player padrão do YouTube sobre vídeo de canal oficial. Sem extração de HLS,
   sem proxy, sem remoção de anúncios/DRM. A disponibilidade é externa. */
const EMBED_SOURCES = Object.freeze({
  tvbrasil:{kind:'official',url:'https://aovivo.ebc.com.br/embed-tvbrasil.html',label:'Incorporação publicada pela EBC',reference:'https://aovivo.ebc.com.br/'},
  camara:{kind:'official',url:'https://www2.camara.leg.br/camaranoticias/tv/embedAoVivo.html',label:'Incorporação publicada pela Câmara',reference:'https://www2.camara.leg.br/camaranoticias/tv/aoVivo.html',alternatives:[{name:'Canal alternativo',url:'https://www2.camara.leg.br/camaranoticias/tv/embedAoVivoAlternativo.html'}]},
  senado:{kind:'youtube',videoId:'htNHJFwi0Cw',label:'Vídeo Ao Vivo do canal oficial TV Senado',reference:'https://www.youtube.com/watch?v=htNHJFwi0Cw'},
  justica:{kind:'youtube',videoId:'20pNCjFf0-o',label:'Vídeo Ao Vivo do canal oficial STF',reference:'https://www.youtube.com/watch?v=20pNCjFf0-o'},
  canalgov:{kind:'youtube',videoId:'nqfph9USEYA',label:'Vídeo Ao Vivo do CanalGov oficial',reference:'https://www.youtube.com/watch?v=nqfph9USEYA'},
  cancaonova:{kind:'youtube',videoId:'wK5znZmCxa0',label:'Vídeo Ao Vivo da TV Canção Nova oficial',reference:'https://www.youtube.com/watch?v=wK5znZmCxa0'},
  novotempo:{kind:'youtube',videoId:'Y_j8xQ2dCv8',label:'Vídeo Ao Vivo da Rede Novo Tempo oficial',reference:'https://www.youtube.com/watch?v=Y_j8xQ2dCv8'}
});
for(const channel of channels){if(Object.prototype.hasOwnProperty.call(EMBED_SOURCES,channel.id))channel.embed=EMBED_SOURCES[channel.id]}
const safeEmbed=source=>{
  if(!source||typeof source!=='object')return null;
  if(source.kind==='official'){
    const approved=['https://aovivo.ebc.com.br/embed-tvbrasil.html','https://www2.camara.leg.br/camaranoticias/tv/embedAoVivo.html','https://www2.camara.leg.br/camaranoticias/tv/embedAoVivoAlternativo.html'];
    return approved.includes(source.url)?source.url:null;
  }
  if(source.kind==='youtube' && /^[a-zA-Z0-9_-]{11}$/.test(source.videoId||'') && Object.values(EMBED_SOURCES).some(v=>v.kind==='youtube'&&v.videoId===source.videoId))return 'https://www.youtube-nocookie.com/embed/'+source.videoId+'?playsinline=1&rel=0';
  return null;
};

const validOfficial=value=>{try{const u=new URL(value);return u.protocol==='https:'&&Boolean(u.hostname)&&!u.username&&!u.password;}catch(_){return false;}};
const cleanText=(value,max=70)=>String(value??'').trim().replace(/\s+/g,' ').slice(0,max);
const normalize=str=>String(str??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const availableCategories=[...new Set(channels.map(c=>c.category))];
const allStates=['BR','AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];
const api=Object.freeze({channels,validOfficial,cleanText,normalize,safeEmbed,availableCategories,allStates,reviewDate:'2026-10-16',version:'2.0'});root.TV_CATALOGO=api;
if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
