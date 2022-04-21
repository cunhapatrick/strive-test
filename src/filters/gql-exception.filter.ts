import {
	Catch,
	HttpException,
	ArgumentsHost,
	Logger,
	HttpStatus,
} from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';

@Catch()
export class GraphqlExceptionFilter implements GqlExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const gqlHost = GqlArgumentsHost.create(host);
		const info = gqlHost.getInfo<GraphQLResolveInfo>();

		const status = exception.getStatus
			? exception.getStatus()
			: HttpStatus.INTERNAL_SERVER_ERROR;

		if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
			Logger.error(exception);
		}

		const errorResponse = {
			statusCode: status,
			timestamp: new Date().toLocaleString(),
			error:
				status !== HttpStatus.INTERNAL_SERVER_ERROR
					? exception.message ||
					  (exception.getResponse() as Record<string, unknown>).error ||
					  null
					: 'Internal server error',
		};

		const error = {
			...errorResponse,
			type: info.parentType,
			field: info.fieldName,
		};

		Logger.error(
			`${info.parentType} ${info.fieldName}`,
			JSON.stringify(error),
			'ExceptionFilter'
		);

		return exception;
	}
}
