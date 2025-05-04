import { registerEnumType } from '@nestjs/graphql';
import { BackgroundType, ComponentType } from '@prisma/client';

registerEnumType(ComponentType, {
  name: 'ComponentType',
  description: '컴포넌트 종류',
  valuesMap: {
    SECTION: { description: '섹션' },
    INQUIRY: { description: '문의' },
  },
});

registerEnumType(BackgroundType, {
  name: 'BackgroundType',
  description: '배경 종류',
  valuesMap: {
    COLOR: { description: '색상' },
    IMAGE: { description: '이미지' },
  },
});
