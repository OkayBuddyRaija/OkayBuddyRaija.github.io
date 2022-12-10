import enTexts from '~/static/datastore/texts_locale_en_EN.json';
import jpTexts from '~/static/datastore/texts.json';
import { TextGroup } from './Types'

type textType = { [key: string]: any };

var texts_en: textType = {};
var texts_jp: textType = {};

for (var obj of enTexts as Array<TextGroup>) {
    texts_en[obj.name] = obj.texts;
}
for (var obj of jpTexts as Array<TextGroup>) {
    texts_jp[obj.name] = obj.texts;
}

export { texts_en, texts_jp};
