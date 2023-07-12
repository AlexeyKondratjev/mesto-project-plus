export enum HttpResponseStatusCodes {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500
}

export enum ErrorPatternMessages {
  BAD_REQUEST_CREATE = 'Переданы некорректные данные при создании',
  BAD_REQUEST_DELETE = 'Переданы некорректные данные при удалении',
  BAD_REQUEST_UPDATE = 'Переданы некорректные данные при обновлении данных',
  NOT_FOUND_BY_ID = 'По указанному id не удалось найти',
  SERVER_ERROR = 'На сервере произошла ошибка'
}