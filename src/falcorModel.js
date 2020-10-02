import falcor from "falcor";
import falcorDataSource from "falcor-http-datasource";


var model = new falcor.Model({
    source: new falcorDataSource("/model.json")
});

export default model;
