const { MattermostClient } = require('../dist');

const client = new MattermostClient();

client.postMessageToIncomingWebhook(
  'https://mattermost.lubycon.io/hooks/o5sn395coifhfbkyiwy3j7twyh',
  {
    text: '희희',
    username: '웹훅 테스트',
  }
);
