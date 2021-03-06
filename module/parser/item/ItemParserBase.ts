import {Parser} from "../Parser";
import {ImportHelper} from "../../helper/ImportHelper";
import Item = Shadowrun.Item;

export abstract class ItemParserBase<TResult extends Item> extends Parser<TResult> {
    Parse(jsonData: object, data: TResult, jsonTranslation?: object): TResult {
        data.name = ImportHelper.StringValue(jsonData, "name");

        data.data.description.source = `${ImportHelper.StringValue(jsonData, "source")} ${ImportHelper.StringValue(jsonData, "page")}`;

        data.data.technology.availability = ImportHelper.StringValue(jsonData, "avail", "0");
        data.data.technology.cost = ImportHelper.IntValue(jsonData, "cost", 0);
        data.data.technology.rating = ImportHelper.IntValue(jsonData, "rating", 0);

        if (jsonTranslation) {
            const origName = ImportHelper.StringValue(jsonData, "name");
            data.name = ImportHelper.MapNameToTranslation(jsonTranslation, origName);
            data.data.description.source = `${ImportHelper.StringValue(jsonData, "source")} ${ImportHelper.MapNameToPageSource(jsonTranslation, origName)}`;
        }

        return data;
    }
}