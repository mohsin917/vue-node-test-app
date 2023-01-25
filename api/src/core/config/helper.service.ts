import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
const Jimp = require('jimp');

/**
 * HelperService
 * 
 */
@Injectable()
export class HelperService {
  /**
   * Round number up to 2 decimal places.
   * 
   * @param {number} amount number
   * @returns number
   */
  round(num) {
    if (num && !isNaN(num)) {
      return Number((Math.round(num * 100) / 100).toFixed(2))
    }
    return 0;

  }

  getFilePathAndName(file) {
    const DIRECTORY_SEPARATOR = /^win/.test(process.platform) ? "\\" : "/"

    let ary = file.split(DIRECTORY_SEPARATOR);
    let file_name = ary[ary.length - 1];
    let file_path = '';

    for (let i = 0; i < ary.length - 1; i++) {
      file_path = file_path + ary[i] + DIRECTORY_SEPARATOR;
    }

    return { path: file_path, file_name: file_name }
  }

  /**
   * 
   * @param {string} file file with complete path i.e. uploads/users/116/946229e4-19dc-4562-957f-d3fb949609b8.png
   * @returns 
   */
  async deleteFile(file) {
    return new Promise((resolve, reject) => {
      if (fs.existsSync(file)) {
        fs.unlink(file, function (err) {
          if (err) {
            console.log('delete file error');
            console.log(err);
          }
        });
      }
      resolve(true);
    })
  }

  async resizeImage(file, width, height, quality = 60, keepRatio = false) {

    return new Promise((resolve) => {

      Jimp.read(file, (err, img) => {
        if (err) throw err;

        let width2 = width;
        let height2 = height;

        if (keepRatio) {
          var w = img.bitmap.width;
          var h = img.bitmap.height;
          let r = this.calculateAspectRatioFit(w, h, width, height);
          width2 = r.width;
          height2 = r.height;
        }

        const fileData = this.getFilePathAndName(file);

        img
          .resize(width2, height2)
          .quality(quality)
          .write(fileData.path + width + 'x' + height + '_' + fileData.file_name);

        resolve(true);

      }).catch(function (err) {
        console.log(err);
      });

    })
  }

  calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight): any {
    const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

    return { width: srcWidth * ratio, height: srcHeight * ratio };
  }

  async createDirectory(path) {
    return new Promise((resolve, reject) => {
      if (fs.existsSync(path)) {
        resolve(true);
      }
      else {
        fs.mkdir(path, { recursive: true }, error => {
          if (error) {
            reject(error)
          }
          resolve(true);
        });
      }
    }).catch(err => {

    })
  }

  CreateFile(path, buffer, type) {
    return new Promise((resolve, reject) => {
      fs.writeFile(`${path}`, buffer, type, (e: any) => {
        if (e) {
          console.error(e);
          reject(e)
        }
        resolve(true)
      });
    })
  }
}