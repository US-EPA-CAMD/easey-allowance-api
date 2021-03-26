import { Request } from 'express';

export class ResponseHeaders {
  public static setPagination(page: number, perPage: number, totalCount: number, req: Request) {
    let concatLinks: string;

    if (page && perPage) {
      const totalPages = Math.ceil(totalCount / (perPage));

      const pageParam = `page=${+page}`;
      const first = `<${req.url.replace(pageParam, `page=1`)}>; rel="first"`;
      const prev = `<${req.url.replace(pageParam, `page=${+page - +1}`)}>; rel="previous"`;
      const next = `<${req.url.replace(pageParam, `page=${+page + +1}`)}>; rel="next"`;
      const last = `<${req.url.replace(pageParam, `page=${totalPages}`)}>; rel="last"`;

      switch (+page) {
        case 1: {
          concatLinks = `${next},${last}`;
          break;
        }
        case totalPages: {
          concatLinks = `${first},${prev}`;
          break;
        }
        default: {
          concatLinks = `${first},${prev},${next},${last}`;
          break;
        }
      }
      req.res.setHeader('Link', concatLinks);
      req.res.setHeader('X-Total-Count', totalCount);
    }
  }
}
