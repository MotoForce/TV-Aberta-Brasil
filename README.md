# TV Aberta Brasil — 2.0 (player dentro do aplicativo)

Aplicativo web gratuito em HTML, CSS e JavaScript, sem backend, com **20 entradas no catálogo** e **7 canais com fontes incorporáveis cadastradas**. O usuário permanece na interface ao iniciar esses players; os demais canais têm acesso aos sites oficiais. **Não é uma IPTV própria**, não captura nem redistribui sinal e não promete transmitir todos os canais da TV aberta brasileira.

## O que há na 2.0

- **Sala de TV integrada**, formato 16:9, controles de recarregar, parar e tela cheia (se houver suporte do navegador).
- **Acesso rápido** a sete canais cujo player é disponibilizado pela fonte oficial ou usa o player de um vídeo do canal oficial no YouTube.
- **TV Câmara com fonte alternativa**, ambas com código de incorporação publicado no site da própria Câmara.
- **Filtro “Com player interno”**, busca, filtros por região/categoria, favoritos, temas claro/escuro.
- Catálogo preservado da versão 1.0: 20 canais/praças (o sinal online pode ser diferente do transmitido por antena).
- Canais personalizados via link HTTPS, backup JSON importável da versão 1.0 ou 2.0, PWA instalável em HTTPS.
- Iframes carregados **somente após clique do usuário**. Sem chamadas de vídeo externas antes da interação. O conteúdo chega diretamente do provedor; o app não disponibiliza os bytes dos vídeos.
- Botão de portal oficial e avisos de transmissão bloqueada/encerrada para cada player.

## Fontes de reprodução cadastradas

| Canal | Tipo de player | Fonte e condições |
| --- | --- | --- |
| TV Brasil | `iframe` direto | [EBC: código de incorporação](https://aovivo.ebc.com.br/) (`embed-tvbrasil.html`) |
| TV Câmara | `iframe` direto | [Câmara: transmissão e código de incorporação](https://www2.camara.leg.br/camaranoticias/tv/aoVivo.html) |
| TV Câmara — feed alternativo | Fonte selecionável dentro da TV Câmara | [Câmara: transmissão alternativa](https://www2.camara.leg.br/camaranoticias/tv/aoVivoAlternativo.html) |
| TV Senado | YouTube embutido | [Vídeo publicado pela TV Senado oficial](https://www.youtube.com/watch?v=htNHJFwi0Cw); live pode encerrar |
| TV Justiça | YouTube embutido | [Vídeo publicado pelo STF oficial](https://www.youtube.com/watch?v=20pNCjFf0-o); live pode encerrar |
| Canal Gov | YouTube embutido | [Vídeo publicado pelo CanalGov oficial](https://www.youtube.com/watch?v=nqfph9USEYA); live pode encerrar |
| TV Canção Nova | YouTube embutido | [Vídeo publicado pela TV Canção Nova oficial](https://www.youtube.com/watch?v=wK5znZmCxa0); live pode encerrar |
| TV Novo Tempo | YouTube embutido | [Vídeo publicado pela Rede Novo Tempo oficial](https://www.youtube.com/watch?v=Y_j8xQ2dCv8); live pode encerrar |

A existência de um vídeo no YouTube **não comprova** que ele continua ao vivo ou permite incorporação neste momento. Só o player do provedor determina se vai reproduzir. Não adicionamos streams HLS extraídos, proxies para burlar bloqueios, reproduções de terceiros ou conteúdo protegido.

Os demais 13 canais mantêm seus endereços oficiais no catálogo. O aplicativo não tenta enquadrar sites que proíbem `iframe` nem simula playback. Direitos de exibição online, localização, cadastro e anúncios são controlados pela emissora. Alguns canais exibem programas diferentes na internet ou suspendem o sinal.

## Como utilizar

### Mais recomendado: publicação em HTTPS

1. Extraia todo o ZIP para uma pasta no GitHub Pages, UOL Host, ou outro servidor com HTTPS.
2. Publique `index.html`, `app.js`, `catalog.js`, `styles.css`, `manifest.webmanifest`, `sw.js` e `assets/icon.svg`, mantendo os caminhos.
3. Abra o endereço HTTPS, selecione um canal nos atalhos “ACESSO RÁPIDO” ou clique “▶ Assistir aqui” em um cartão.
4. Use o botão de tela cheia do aplicativo ou do player. Para trocar de canal, escolha outro atalho. Para parar e liberar os recursos de rede, use “✕ Parar”.
5. Se a emissora bloquear a incorporação ou se o vídeo tiver sido encerrado, abra sua página oficial pela alternativa exibida.

### Arquivo único sem instalação

Abra `TV_Aberta_Brasil_2_0_Standalone.html` no navegador. Todos os elementos da interface, imagens e scripts do app estão nesse arquivo. Ainda é necessária internet para os vídeos. **Importante:** vídeos do YouTube podem recusar a incorporação em `file://` por falta de origem HTTP; por isso recomenda-se hospedar em HTTPS. O standalone não registra Service Worker.

### Como atualizar as fontes

Edite apenas as fontes internas aprovadas na constante `EMBED_SOURCES` de `catalog.js`. A função `safeEmbed()` usa uma allowlist: URLs de terceiros adicionadas pelo usuário não viram iframe. Para uma nova emissora, primeiro verifique se ela **oferece código público de incorporação** ou um vídeo de canal oficial com embedding permitido; atualize também testes, referências e cache do PWA. Não remova os controles/branding de players de terceiros.

## Privacidade e segurança

O aplicativo não exige conta, não tem servidor próprio, nem envia favoritos ou buscas para terceiros. Ao clicar para assistir, o navegador carrega dados diretamente dos domínios da EBC, da Câmara ou do YouTube. Esses terceiros podem coletar endereço IP e outros dados sob suas próprias políticas. O modo `youtube-nocookie.com` não torna a navegação anônima. Os links externos abrem com `noopener noreferrer`. Canais personalizados são tratados como texto (não HTML executável) e aceitam apenas HTTPS.

## QA

Testes estáticos: `node --test tests/*.test.cjs` ou `node --test tests/*.cjs`.

A verificação automatizada de 8 cenários unitários passou. O teste visual com Chromium foi **bloqueado pelo ambiente de execução** (`ERR_BLOCKED_BY_ADMINISTRATOR`), portanto reprodução efetiva, navegação visual e compatibilidade Android/Windows **não foram homologadas**. Consulte `QA.md` para testes manuais.

## Direitos

© 2026 Nailson Rodrigues de Lima — código, organização visual e identidade do aplicativo. Vídeos, marcas, programação e players são dos respectivos titulares. Não há afiliação com as emissoras.
