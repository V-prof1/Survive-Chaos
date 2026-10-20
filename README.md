# Survive Chaos — Android-ready (100% mobile)

Este repositório mantém o jogo web original em `www/` e usa Capacitor para empacotá-lo como aplicativo Android.

## O que já está pronto

- Jogo completo dentro de `www/`.
- Configuração Capacitor em `capacitor.config.json`.
- Dependências em `package.json`.
- Build automático em `.github/workflows/build-apk.yml`.
- O workflow gera um APK DEBUG instalável sem precisar de PC.

## Como o build funciona

1. Uma alteração é enviada para a branch `main`.
2. O GitHub Actions instala Node.js 22 e Java 17.
3. Instala Capacitor 8.
4. Cria o projeto Android automaticamente.
5. Sincroniza os arquivos de `www/`.
6. Compila `Survive-Chaos-debug.apk`.
7. O APK aparece nos artefatos da execução do workflow.

## Para atualizar o jogo depois

Edite os arquivos de `www/` (por exemplo `game.js`, `style.css`, sprites e músicas), envie as alterações ao GitHub e um novo APK será criado automaticamente.

## Observações

- A primeira versão é um APK DEBUG para testes.
- O save atual por `localStorage` continua sendo a base do save local.
- A fonte do Google pode cair para as fontes fallback quando estiver offline.
- Assinatura RELEASE/AAB para Google Play será adicionada após a validação do APK de teste.
- Multiplayer será implementado depois que a base Android estiver validada.
