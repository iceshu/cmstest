import { inject } from "midway";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Context } from "egg";
import * as shortid from "shortid";
// eslint-disable-next-line import/no-extraneous-dependencies
import * as _ from "lodash";

const checkCurrentId = (ids: string) => {
  if (!ids) {
    return false;
  }
  let idState = true;
  const idsArr = ids.split(",");
  if (typeof idsArr === "object" && idsArr.length > 0) {
    for (let i = 0; i < idsArr.length; i++) {
      if (!shortid.isValid(idsArr[i])) {
        idState = false;
        break;
      }
    }
  } else {
    idState = false;
  }
  return idState;
};

export default class BaseService {
  @inject()
  ctx!: Context;

  public _list = async (Model: any, payload: any, obj: any) => {
    let {
      sort = {
        date: -1,
      },
      files = null,
      query = {},
      searchKeys = [],
      populate = [],
    } = obj;

    let { current, pageSize, searchkey, isPaging = 1, skip } = payload;

    let docs = [];
    let count = 0;
    query = query || {};
    (current = current || 1), (pageSize = Number(pageSize) || 10);
    isPaging = isPaging == "0" ? false : true;
    const skipNum = skip ? skip : (Number(current) - 1) * Number(pageSize);
    sort = !_.isEmpty(sort)
      ? sort
      : {
          date: -1,
        };

    if (searchkey) {
      if (searchKeys) {
        if (typeof searchKeys === "object" && searchKeys.length > 0) {
          const searchStr = [] as any;
          for (let i = 0; i < searchKeys.length; i++) {
            const keyItem: any = searchKeys[i];
            searchStr.push({
              [keyItem]: {
                $regex: searchkey,
              },
            });
          }
          query.$or = searchStr;
        } else {
          query[searchKeys] = {
            $regex: new RegExp(searchkey, "i"),
          };
        }
      }
    }
    if (isPaging) {
      docs = await Model.find(query, files)
        .skip(skipNum)
        .limit(Number(pageSize))
        .sort(sort)
        .populate(populate)
        .exec();
    } else if (payload.pageSize > 0) {
      docs = await Model.find(query, files)
        .skip(skipNum)
        .limit(pageSize)
        .sort(sort)
        .populate(populate)
        .exec();
    } else {
      docs = await Model.find(query, files)
        .skip(skipNum)
        .sort(sort)
        .populate(populate)
        .exec();
    }
    count = await Model.countDocuments(query).exec();

    if (isPaging) {
      const pageInfoParams = {
        total: count,
        pageSize: Number(pageSize),
        current: Number(current),
        searchkey: searchkey || "",
        totalPage: Math.ceil(count / Number(pageSize)),
      };
      for (const querykey in query) {
        if (query.hasOwnProperty(querykey)) {
          const queryValue = query[querykey];
          _.assign(pageInfoParams, {
            [querykey]: queryValue || "",
          });
        }
      }
      return {
        docs,
        pageInfo: pageInfoParams,
      };
    }
    return docs;
  };

  public _count = async (Model: any, query: any = {}) => {
    return await Model.countDocuments(query);
  };

  public _create = async (Model: any, payload: any) => {
    return await Model.create(payload);
  };

  public _createMany = async (Model: any, payload: any) => {
    return await Model.insertMany(payload);
  };

  public _item = async (Model: any, obj: any) => {
    const { files = null, query = {}, populate = [] } = obj;

    return await Model.findOne(query, files).populate(populate).exec();
  };

  public _removes = async (Model: any, IDS: any, key: string = "_id") => {
    let ids = IDS;
    if (!checkCurrentId(ids)) {
      throw new Error("validate_error_params");
    } else {
      ids = ids.split(",");
    }

    return await Model.deleteMany({
      [key]: {
        $in: ids,
      },
    });
  };

  public _removeAll = async (Model: any) => {
    return await Model.deleteMany({});
  };

  public _safeDelete = async (Model: any, ids: any) => {
    if (!checkCurrentId(ids)) {
      throw new Error("validate_error_params");
    } else {
      ids = ids.split(",");
    }

    return await Model.updateMany(
      {
        _id: {
          $in: ids,
        },
      },
      {
        $set: {
          state: "0",
        },
      }
    );
  };
  public _update = async (
    Model: any,
    _id: string,
    data: Object,
    query = {}
  ) => {
    if (_id) {
      query = _.assign({}, query, {
        _id,
      });
    } else {
      if (_.isEmpty(query)) {
        throw new Error("validate_error_params");
      }
    }

    return await Model.findOneAndUpdate(query, {
      $set: data,
    });
  };
  public _updateMany = async (Model: any, ids = [], data: any, query = {}) => {
    if (_.isEmpty(ids) && _.isEmpty(query)) {
      throw new Error("validate_error_params");
    }

    if (!_.isEmpty(ids)) {
      query = _.assign({}, query, {
        _id: {
          $in: ids,
        },
      });
    }

    return await Model.updateMany(query, {
      $set: data,
    });
  };

  public _addToSet = async (
    Model: any,
    id: string,
    data: Object,
    query = {}
  ) => {
    if (_.isEmpty(id) && _.isEmpty(query)) {
      throw new Error("validate_error_params");
    }

    if (!_.isEmpty(id)) {
      query = _.assign({}, query, {
        _id: id,
      });
    }

    return await Model.updateMany(query, {
      $addToSet: data,
    });
  };

  public _pull = async (Model: any, id: String, data: Object, query = {}) => {
    if (_.isEmpty(id) && _.isEmpty(query)) {
      throw new Error("validate_error_params");
    }

    if (!_.isEmpty(id)) {
      query = _.assign({}, query, {
        _id: id,
      });
    }

    return await Model.updateMany(query, {
      $pull: data,
    });
  };

  public _inc = async (
    Model: any,
    id: string,
    data: Object,
    { query = {} } = {}
  ) => {
    if (_.isEmpty(id) && _.isEmpty(query)) {
      throw new Error("validate_error_params");
    }

    if (!_.isEmpty(id)) {
      query = _.assign({}, query);
    }

    return await Model.updateMany(query, {
      $inc: data,
    });
  };
}
