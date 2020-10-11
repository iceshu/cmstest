// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import 'egg-onerror';
import 'egg-session';
import 'egg-i18n';
import 'egg-multipart';
import 'egg-logrotator';
import 'egg-schedule';
import 'egg-jsonp';
import 'egg-view';
import 'midway-schedule';
import 'egg-mongoose';
import 'egg-bcrypt';
import 'egg-validate-plus';
import 'egg-jwt';
import { EggPluginItem } from 'egg';
declare module 'egg' {
  interface EggPlugin {
    onerror?: EggPluginItem;
    session?: EggPluginItem;
    i18n?: EggPluginItem;
    watcher?: EggPluginItem;
    multipart?: EggPluginItem;
    security?: EggPluginItem;
    development?: EggPluginItem;
    logrotator?: EggPluginItem;
    schedule?: EggPluginItem;
    static?: EggPluginItem;
    jsonp?: EggPluginItem;
    view?: EggPluginItem;
    schedulePlus?: EggPluginItem;
    cors?: EggPluginItem;
    mongoose?: EggPluginItem;
    bcrypt?: EggPluginItem;
    validatePlus?: EggPluginItem;
    jwt?: EggPluginItem;
  }
}