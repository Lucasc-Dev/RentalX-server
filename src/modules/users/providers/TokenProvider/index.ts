import { container } from 'tsyringe';

import JsonWebTokenProvider from './implementations/JsonWebTokenProvider';
import ITokenProvider from './models/ITokenProvider';

container.registerSingleton<ITokenProvider>(
    'TokenProvider',
    JsonWebTokenProvider,
)