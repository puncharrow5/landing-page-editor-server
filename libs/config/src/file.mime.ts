export const MimeObj = {
  jpg: 'image/jpg',
  png: 'image/png',
  jpeg: 'image/jpeg',
  heic: 'image/heic',
  gif: 'image/gif',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  hwp: [
    'application/x-hwp',
    'application/haansofthwp',
    'application/vnd.hancom.hwp',
  ],
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  pdf: 'application/pdf',
};

export type MimeKeys = keyof typeof MimeObj;
