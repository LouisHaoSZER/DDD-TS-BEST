// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    typescript: {
      tsconfigPath: [
        'tsconfig.json',
      ],
    },
  },
  {
    rules: {
      'ts/no-unsafe-argument': 'off',
      'ts/no-unsafe-assignment': 'off',
      'ts/no-unsafe-member-access': 'off',
      'ts/no-unsafe-return': 'off',
      'ts/no-unsafe-call': 'off',
      'antfu/top-level-function': 'off',
      'no-console': 'off',
    },
  },
)
