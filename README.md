
# Kindle to Notion
Send Kindle clippings to your Notion database.<br/>
Backend project: [Backend project](https://github.com/had0pelagic/KindleToolAPI)

## Features
- Select clippings date from - to
- Choose what type of clippings to retrieve from a file (highlight, note, bookmark or all)
- Retrieve desired amount of clippings from the start or the end of a file

## Usage
### Download both backend and frontend solutions<br/>
To start this frontend project, locate it and type in terminal:
```bash
  npm start
```
### Notion setup
Create new database with one 'Title' column:<br/><br/>
![notion_db](https://github.com/had0pelagic/KindleToNotion/blob/had0pelagic-examples/examples/database.png)<br/>
Please read about notion API setup here: [Notion Docs](https://developers.notion.com/docs)

## Showcase
<img align="center" width="100%" src="https://github.com/had0pelagic/KindleToNotion/blob/had0pelagic-examples/examples/kindletonotionexamplemain.gif" alt="gif">

## Future
- Fix known bugs:
  - Sometimes duplicate pages are being made
  - No option to parse AM/PM time in the backend
