# Plano de Ação: Otimização de Performance da IDE

Identificamos que o processo `language_server_windows_x64` está consumindo **12.5 GB de RAM**, o que indica um vazamento de memória ou sobrecarga de indexação.

## 🛠️ Passos Imediatos (Para limpar a memória)

1.  **Reinicie o Editor**: Fechar e abrir a IDE é o passo mais eficaz para limpar os 12GB de cache acumulados pelo Language Server.
2.  **Feche Abas "Pesadas"**: Arquivos `.sql` de importação (como os `FULL_import_pen_part*.sql`) consomem muita memória quando abertos pois a IDE tenta parsear cada linha para syntax highlighting.

## 📂 Organização do Projeto (Melhoria Permanente)

3.  **Agrupar Scripts SQL**: Atualmente há ~30 arquivos SQL na raiz. Mover esses arquivos para uma pasta dedicada (ex: `/database/scripts/`) ajuda a IDE a gerenciar o contexto.
4.  **Consolidar `node_modules`**: Notei uma pasta `node_modules` dentro de `sip-tester-api`. Verifique se ela é estritamente necessária ou se as dependências podem ser movidas para a raiz.

## ⚙️ Configurações Recomendadas

5.  **Excluir Pastas da Indexação**: Se você usa o VS Code ou Cursor, adicione estas pastas ao `files.watcherExclude` e `search.exclude` nas configurações:
    *   `node_modules`
    *   `dist`
    *   `build`
    *   Pastas de dados de importação SQL

---

> [!TIP]
> **Recomendação Principal**: Mover os arquivos de importação SQL para uma subpasta e reiniciar a IDE agora deve reduzir o uso de RAM de 12GB para menos de 1GB.
