/* eslint-disable import/prefer-default-export */
import { app } from 'electron';
import path from 'path';
import fs from 'fs';

const RESOURCES_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'assets')
  : path.join(__dirname, '../../assets');

export const getAssetPath = (...paths: string[]): string => {
  return path.join(RESOURCES_PATH, ...paths);
};

export const getTemplateNames = () => {
  const files = fs.readdirSync(getAssetPath('templates', 'enable-templates'));
  return files.map((file) => file.split('.')[0]);
};
