const express = require('express');
const app = express();
const { Client } = require("@notionhq/client");
const notion = new Client({auth: process.env.NOTION_TOKEN});

app.get('/', (req, res) => {
  (async () => {
    const myPage = await notion.databases.query({
      database_id: process.env.DATABASE_ID,
    })
    const itemList = [];
    const data = myPage.results;
    for (d of data) {
      let id, url, imgUrl, tags, title, createdAt, status, purpose, essence, actionPlan, item={}
      id = d?.id
      url = d.properties.URL?.url;
      imgUrl = d.properties.Cover.files[0]?.name;
      tags = d.properties.Tags.multi_select[0]?.name;
      title = d.properties.Name.title[0].text?.content;
      createdAt = d.properties.Created_at?.created_time;
      status = d.properties.Status.select?.name;
      purpose = d.properties.Purpose.rich_text[0]?.text?.content;
      essence = d.properties.Essence.rich_text[0]?.text?.content;
      actionPlan = d.properties.Action_plan.rich_text[0]?.text?.content;
      item = {
        id, url, imgUrl, tags, title, createdAt, status, purpose, essence, actionPlan
      }
      itemList.push(item);
    }
    res.json(itemList);
  })();
})

app.use(express.json());
app.put('/:pageId', (req, res) => {
  const bookUrl = req.body.params.bookUrl;
  const bookTitle = req.body.params.bookTitle;
  const bookPurpose = req.body.params.bookPurpose;
  const bookEssence = req.body.params.bookEssence;
  const bookActionPlan = req.body.params.bookActionPlan;
  const id = req.body.params.id;
  (async () => {
    const response = await notion.pages.update({
      page_id: id,
      properties: {
        Name: {
          title: [
            {
              text: {
                content: bookTitle
              }
            }
          ]
        },
        URL: {
          url: bookUrl
        },
        Purpose: {
          rich_text: [
            {
              text: {
                content: bookPurpose
              }
            }
          ]
        },
        Essence: {
          rich_text: [
            {
              text: {
                content: bookEssence
              }
            }
          ]
        },
        Action_plan: {
          rich_text: [
            {
              text: {
                content: bookActionPlan
              }
            }
          ]
        }
      }
    }).catch(err => console.log(err));
    console.log(response);
  })();
  res.sendStatus(200)
})

module.exports = {
  path: '/api',
  handler: app
}