import json
import os

class Card:

    def __init__(self, no, heroineId, alias):  #Normal_thumb, Normal, Blooming_thumb, Blooming
        self.no = no
        self.heroineId = heroineId
        self.alias = alias
        # self.Normal_thumb = Normal_thumb
        # self.Normal = Normal
        # self.Blooming_thumb = Blooming_thumb
        # self.Blooming = Blooming

        def getcardid(self):
            return self.no

        def getheroineId(self):
            return self.heroineId

        def getalias(self):
            return self.alias
        

# ----------------

cardList = []

with open('CardMaster.json', 'r', encoding='utf-8') as json_file:
    data = json.load(json_file)
    for c in data['<ModelList>k__BackingField']:
        cardList.append(Card(c['id'], c['heroineId'], c['alias']))

# cardList.sort(key = lambda x:(x.heroineId, x.costumeId), reverse = False)

# ----------------

chars = ['六石陽菜', '鷹取舞花', '鹿野志穂', "月居ほのか", "天童悠希", "赤川千紗", "恵庭あいり", "九条柚葉", "夜峰美晴", "神室絢", "宮路まほろ", "日名倉莉子", "丸山利恵", "宇津木聡里", "明神凛音", "遠見鳴"]

jsondata = {'Cards':[]}

# for card in cardList:
#     if (card.no < 9000000):
#         jsondata['Cards'].append({'cardId': card.no, 
#                         'heroineId': card.heroineId,
#                         'alias': card.alias,
#                         'Normal_thumb': 'Cards/%s/Card_%s_1_c.png' % (card.no, card.no),
#                         'Normal': 'Cards/%s/Card_%s_1_b.png' % (card.no, card.no),
#                         'Blooming_thumb': 'Cards/%s/Card_%s_2_c.png' % (card.no, card.no),
#                         'Blooming': 'Cards/%s/Card_%s_2_b.png' % (card.no, card.no)
#                         })
#     else:
#         jsondata['Cards'].append({'cardId': card.no, 
#                         'heroineId': card.heroineId,
#                         'alias': card.alias,
#                         'Normal_thumb': 'Cards/%s/Card_%s_1_c.png' % (card.no, card.no),
#                         'Normal': 'Cards/%s/Card_%s_1_b.png' % (card.no, card.no),
#                         'Blooming_thumb': '',
#                         'Blooming': ''
#                         })

for card in cardList:
    if (card.no < 9000000):
        jsondata['Cards'].append({'cardId': card.no, 
                        'heroineId': card.heroineId,
                        'heroine': chars[card.heroineId-1],
                        'alias': card.alias,
                        'url':{
                            'Normal_thumb': 'Cards/%s/Card_%s_1_c.png' % (card.no, card.no),
                            'Normal': 'Cards/%s/Card_%s_1_b.png' % (card.no, card.no),
                            'Blooming_thumb': 'Cards/%s/Card_%s_2_c.png' % (card.no, card.no),
                            'Blooming': 'Cards/%s/Card_%s_2_b.png' % (card.no, card.no)
                        }
                        })
    else:
        jsondata['Cards'].append({'cardId': card.no,
                        'heroineId': card.heroineId,
                        'heroine': chars[card.heroineId-1],
                        'alias': card.alias,
                        'url':{
                            'Normal_thumb': 'Cards/%s/Card_%s_1_c.png' % (card.no, card.no),
                            'Normal': 'Cards/%s/Card_%s_1_b.png' % (card.no, card.no),
                        }
                        })

with open('CardsData.json', 'w', encoding='utf-8') as outfile:
    json.dump(jsondata, outfile, indent=4, ensure_ascii=False)
