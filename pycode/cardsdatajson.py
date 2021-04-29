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

# chars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 11, 12, 13, 14, 15, 16, 101, 102, 103]

jsondata = {'Cards':[]}

# for char in chars:
#     chartilte = '%02d' % (char)
#     jsondata.update({chartilte:[]})
#     for model in range(1,15):
#         filename = 'live2d/%s/%03d/%03d.model3.json' % (chartilte, model, char)
#         if os.path.exists(filename):
#             c = list(filter(lambda x: (x.heroineId == char and x.costumeId == model), costlist))
#             if c:
#                 jsondata[chartilte].append({ 'costumeId':model, 'name':c[0].costumeName , 'path':filename})
#             else:
#                 jsondata[chartilte].append({ 'costumeId':model, 'name':"不明" , 'path':filename})
            
for card in cardList:
    jsondata['Cards'].append({'cardId': card.no, 
                    'heroineId': card.heroineId,
                    'alias': card.alias,
                    'Normal_thumb': 'Cards/%s/Card_%s_1_c.png' % (card.no, card.no),
                    'Normal': 'Cards/%s/Card_%s_1_b.png' % (card.no, card.no),
                    'Blooming_thumb': 'Cards/%s/Card_%s_2_c.png' % (card.no, card.no),
                    'Blooming': 'Cards/%s/Card_%s_2_b.png' % (card.no, card.no)
                    })


with open('CardsData.json', 'w', encoding='utf-8') as outfile:
    json.dump(jsondata, outfile, indent=4, ensure_ascii=False)
