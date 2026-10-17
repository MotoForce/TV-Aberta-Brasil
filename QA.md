# TV Aberta Brasil 2.0 — Relatório de QA (16/10/2026)

## Escopo implementado

- Catálogo inicial: 20 canais/praças preservados da versão 1.0.
- Fontes internas cadastradas: 7 emissoras, além do sinal alternativo selecionável da TV Câmara.
- Botões: assistir, selecionar fonte, recarregar, parar, tela cheia, abrir site oficial.
- Acesso rápido aos canais com embed e filtro “Com player interno”.
- Favoritos, busca, categorias, estados, temas e backup continuam disponíveis.

## Resultados observados

- `node --check app.js`: **aprovado** (sem erros de sintaxe).
- `node --check catalog.js`: **aprovado** (sem erros de sintaxe).
- `node --test tests/*.cjs`: **8 testes passaram** (catálogo, URLs válidas, filtros conceituais, fonte incorporada allowlist e fonte alternativa).
- Criação de arquivo HTML standalone: **concluída** e validada pela presença de scripts, CSS e ícone inline.
- Tentativa de teste E2E em Chromium local: **bloqueada pela política do navegador do ambiente**, reportando `net::ERR_BLOCKED_BY_ADMINISTRATOR`, sem possibilidade de abrir arquivo ou servidor local. Não foi possível avaliar visualmente a interface nem confirmar reprodução.

### O que os testes NÃO comprovam

- Que streams de terceiros estejam online no momento do uso.
- Que os vídeos oficiais no YouTube continuem ao vivo ou permitam reprodução incorporada.
- Que o provedor libere reprodução em toda região ou em todos os navegadores.
- Que a experiência de tela cheia, PWA, desempenho e permissões esteja homologada em aparelhos reais.
- Que exista licença comercial para redistribuição ou uso das marcas. O aplicativo não redistribui conteúdo, mas uma publicação comercial deve passar por análise jurídica.

## Testes manuais recomendados antes da publicação

1. Em um site HTTPS real, abra a TV Brasil e verifique se imagem e áudio aparecem dentro do player.
2. Abra a TV Câmara e alterne entre fonte principal e canal alternativo.
3. Para cada vídeo do YouTube, confirme se aparece, se está realmente ao vivo e se a opção de incorporar continua liberada. Substitua fontes encerradas por uma live atual e validada.
4. Teste recarregar, parar (o iframe deve ser removido) e tela cheia.
5. Abra Globo, SBT e Record: devem exibir detalhes e botão para o portal oficial, sem tentativas indevidas de iframe.
6. Teste em Android Chrome, computador com Chrome/Edge/Firefox atuais, orientação vertical e horizontal e navegação por teclado.
7. Teste importação de backup versão 1.0 e 2.0, filtros, favoritos, sem armazenamento e sem rede.
8. Execute revisão legal, de acessibilidade e monitoramento de disponibilidade de fontes antes de disponibilizar comercialmente.

## Pendências / risco residual

**Publicação sob validação:** os endereços oficiais foram verificados documentalmente, mas a reprodução das transmissões não foi testada ponta a ponta neste ambiente. Para a promessa “todos os canais dentro do app” é preciso negociar permissão de incorporação com emissoras que não oferecem player público. Não há base para afirmar cobertura total da TV aberta nacional.
