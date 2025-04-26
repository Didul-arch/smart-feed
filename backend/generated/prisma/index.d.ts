
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Sapi
 * 
 */
export type Sapi = $Result.DefaultSelection<Prisma.$SapiPayload>
/**
 * Model Pakan
 * 
 */
export type Pakan = $Result.DefaultSelection<Prisma.$PakanPayload>
/**
 * Model JadwalMakan
 * 
 */
export type JadwalMakan = $Result.DefaultSelection<Prisma.$JadwalMakanPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sapi`: Exposes CRUD operations for the **Sapi** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sapis
    * const sapis = await prisma.sapi.findMany()
    * ```
    */
  get sapi(): Prisma.SapiDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pakan`: Exposes CRUD operations for the **Pakan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pakans
    * const pakans = await prisma.pakan.findMany()
    * ```
    */
  get pakan(): Prisma.PakanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.jadwalMakan`: Exposes CRUD operations for the **JadwalMakan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JadwalMakans
    * const jadwalMakans = await prisma.jadwalMakan.findMany()
    * ```
    */
  get jadwalMakan(): Prisma.JadwalMakanDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Sapi: 'Sapi',
    Pakan: 'Pakan',
    JadwalMakan: 'JadwalMakan'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "sapi" | "pakan" | "jadwalMakan"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Sapi: {
        payload: Prisma.$SapiPayload<ExtArgs>
        fields: Prisma.SapiFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SapiFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SapiPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SapiFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SapiPayload>
          }
          findFirst: {
            args: Prisma.SapiFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SapiPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SapiFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SapiPayload>
          }
          findMany: {
            args: Prisma.SapiFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SapiPayload>[]
          }
          create: {
            args: Prisma.SapiCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SapiPayload>
          }
          createMany: {
            args: Prisma.SapiCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SapiCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SapiPayload>[]
          }
          delete: {
            args: Prisma.SapiDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SapiPayload>
          }
          update: {
            args: Prisma.SapiUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SapiPayload>
          }
          deleteMany: {
            args: Prisma.SapiDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SapiUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SapiUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SapiPayload>[]
          }
          upsert: {
            args: Prisma.SapiUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SapiPayload>
          }
          aggregate: {
            args: Prisma.SapiAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSapi>
          }
          groupBy: {
            args: Prisma.SapiGroupByArgs<ExtArgs>
            result: $Utils.Optional<SapiGroupByOutputType>[]
          }
          count: {
            args: Prisma.SapiCountArgs<ExtArgs>
            result: $Utils.Optional<SapiCountAggregateOutputType> | number
          }
        }
      }
      Pakan: {
        payload: Prisma.$PakanPayload<ExtArgs>
        fields: Prisma.PakanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PakanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PakanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PakanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PakanPayload>
          }
          findFirst: {
            args: Prisma.PakanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PakanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PakanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PakanPayload>
          }
          findMany: {
            args: Prisma.PakanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PakanPayload>[]
          }
          create: {
            args: Prisma.PakanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PakanPayload>
          }
          createMany: {
            args: Prisma.PakanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PakanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PakanPayload>[]
          }
          delete: {
            args: Prisma.PakanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PakanPayload>
          }
          update: {
            args: Prisma.PakanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PakanPayload>
          }
          deleteMany: {
            args: Prisma.PakanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PakanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PakanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PakanPayload>[]
          }
          upsert: {
            args: Prisma.PakanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PakanPayload>
          }
          aggregate: {
            args: Prisma.PakanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePakan>
          }
          groupBy: {
            args: Prisma.PakanGroupByArgs<ExtArgs>
            result: $Utils.Optional<PakanGroupByOutputType>[]
          }
          count: {
            args: Prisma.PakanCountArgs<ExtArgs>
            result: $Utils.Optional<PakanCountAggregateOutputType> | number
          }
        }
      }
      JadwalMakan: {
        payload: Prisma.$JadwalMakanPayload<ExtArgs>
        fields: Prisma.JadwalMakanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JadwalMakanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JadwalMakanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JadwalMakanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JadwalMakanPayload>
          }
          findFirst: {
            args: Prisma.JadwalMakanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JadwalMakanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JadwalMakanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JadwalMakanPayload>
          }
          findMany: {
            args: Prisma.JadwalMakanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JadwalMakanPayload>[]
          }
          create: {
            args: Prisma.JadwalMakanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JadwalMakanPayload>
          }
          createMany: {
            args: Prisma.JadwalMakanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JadwalMakanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JadwalMakanPayload>[]
          }
          delete: {
            args: Prisma.JadwalMakanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JadwalMakanPayload>
          }
          update: {
            args: Prisma.JadwalMakanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JadwalMakanPayload>
          }
          deleteMany: {
            args: Prisma.JadwalMakanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JadwalMakanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.JadwalMakanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JadwalMakanPayload>[]
          }
          upsert: {
            args: Prisma.JadwalMakanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JadwalMakanPayload>
          }
          aggregate: {
            args: Prisma.JadwalMakanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJadwalMakan>
          }
          groupBy: {
            args: Prisma.JadwalMakanGroupByArgs<ExtArgs>
            result: $Utils.Optional<JadwalMakanGroupByOutputType>[]
          }
          count: {
            args: Prisma.JadwalMakanCountArgs<ExtArgs>
            result: $Utils.Optional<JadwalMakanCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    sapi?: SapiOmit
    pakan?: PakanOmit
    jadwalMakan?: JadwalMakanOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    jadwal: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jadwal?: boolean | UserCountOutputTypeCountJadwalArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountJadwalArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JadwalMakanWhereInput
  }


  /**
   * Count Type SapiCountOutputType
   */

  export type SapiCountOutputType = {
    jadwal: number
  }

  export type SapiCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jadwal?: boolean | SapiCountOutputTypeCountJadwalArgs
  }

  // Custom InputTypes
  /**
   * SapiCountOutputType without action
   */
  export type SapiCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SapiCountOutputType
     */
    select?: SapiCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SapiCountOutputType without action
   */
  export type SapiCountOutputTypeCountJadwalArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JadwalMakanWhereInput
  }


  /**
   * Count Type PakanCountOutputType
   */

  export type PakanCountOutputType = {
    jadwal: number
  }

  export type PakanCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jadwal?: boolean | PakanCountOutputTypeCountJadwalArgs
  }

  // Custom InputTypes
  /**
   * PakanCountOutputType without action
   */
  export type PakanCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PakanCountOutputType
     */
    select?: PakanCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PakanCountOutputType without action
   */
  export type PakanCountOutputTypeCountJadwalArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JadwalMakanWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    nama: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    nama: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    nama: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    nama?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    nama?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    nama?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    nama: string
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    nama?: boolean
    jadwal?: boolean | User$jadwalArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    nama?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    nama?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    nama?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "nama", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jadwal?: boolean | User$jadwalArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      jadwal: Prisma.$JadwalMakanPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      nama: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    jadwal<T extends User$jadwalArgs<ExtArgs> = {}>(args?: Subset<T, User$jadwalArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JadwalMakanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly nama: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.jadwal
   */
  export type User$jadwalArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JadwalMakan
     */
    select?: JadwalMakanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JadwalMakan
     */
    omit?: JadwalMakanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JadwalMakanInclude<ExtArgs> | null
    where?: JadwalMakanWhereInput
    orderBy?: JadwalMakanOrderByWithRelationInput | JadwalMakanOrderByWithRelationInput[]
    cursor?: JadwalMakanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JadwalMakanScalarFieldEnum | JadwalMakanScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Sapi
   */

  export type AggregateSapi = {
    _count: SapiCountAggregateOutputType | null
    _avg: SapiAvgAggregateOutputType | null
    _sum: SapiSumAggregateOutputType | null
    _min: SapiMinAggregateOutputType | null
    _max: SapiMaxAggregateOutputType | null
  }

  export type SapiAvgAggregateOutputType = {
    id: number | null
    bobot: number | null
  }

  export type SapiSumAggregateOutputType = {
    id: number | null
    bobot: number | null
  }

  export type SapiMinAggregateOutputType = {
    id: number | null
    jenis: string | null
    bobot: number | null
    image: string | null
    tanggalLahir: Date | null
    tanggalKematian: Date | null
  }

  export type SapiMaxAggregateOutputType = {
    id: number | null
    jenis: string | null
    bobot: number | null
    image: string | null
    tanggalLahir: Date | null
    tanggalKematian: Date | null
  }

  export type SapiCountAggregateOutputType = {
    id: number
    jenis: number
    bobot: number
    image: number
    tanggalLahir: number
    tanggalKematian: number
    _all: number
  }


  export type SapiAvgAggregateInputType = {
    id?: true
    bobot?: true
  }

  export type SapiSumAggregateInputType = {
    id?: true
    bobot?: true
  }

  export type SapiMinAggregateInputType = {
    id?: true
    jenis?: true
    bobot?: true
    image?: true
    tanggalLahir?: true
    tanggalKematian?: true
  }

  export type SapiMaxAggregateInputType = {
    id?: true
    jenis?: true
    bobot?: true
    image?: true
    tanggalLahir?: true
    tanggalKematian?: true
  }

  export type SapiCountAggregateInputType = {
    id?: true
    jenis?: true
    bobot?: true
    image?: true
    tanggalLahir?: true
    tanggalKematian?: true
    _all?: true
  }

  export type SapiAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sapi to aggregate.
     */
    where?: SapiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sapis to fetch.
     */
    orderBy?: SapiOrderByWithRelationInput | SapiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SapiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sapis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sapis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sapis
    **/
    _count?: true | SapiCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SapiAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SapiSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SapiMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SapiMaxAggregateInputType
  }

  export type GetSapiAggregateType<T extends SapiAggregateArgs> = {
        [P in keyof T & keyof AggregateSapi]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSapi[P]>
      : GetScalarType<T[P], AggregateSapi[P]>
  }




  export type SapiGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SapiWhereInput
    orderBy?: SapiOrderByWithAggregationInput | SapiOrderByWithAggregationInput[]
    by: SapiScalarFieldEnum[] | SapiScalarFieldEnum
    having?: SapiScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SapiCountAggregateInputType | true
    _avg?: SapiAvgAggregateInputType
    _sum?: SapiSumAggregateInputType
    _min?: SapiMinAggregateInputType
    _max?: SapiMaxAggregateInputType
  }

  export type SapiGroupByOutputType = {
    id: number
    jenis: string
    bobot: number
    image: string
    tanggalLahir: Date
    tanggalKematian: Date | null
    _count: SapiCountAggregateOutputType | null
    _avg: SapiAvgAggregateOutputType | null
    _sum: SapiSumAggregateOutputType | null
    _min: SapiMinAggregateOutputType | null
    _max: SapiMaxAggregateOutputType | null
  }

  type GetSapiGroupByPayload<T extends SapiGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SapiGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SapiGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SapiGroupByOutputType[P]>
            : GetScalarType<T[P], SapiGroupByOutputType[P]>
        }
      >
    >


  export type SapiSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jenis?: boolean
    bobot?: boolean
    image?: boolean
    tanggalLahir?: boolean
    tanggalKematian?: boolean
    jadwal?: boolean | Sapi$jadwalArgs<ExtArgs>
    _count?: boolean | SapiCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sapi"]>

  export type SapiSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jenis?: boolean
    bobot?: boolean
    image?: boolean
    tanggalLahir?: boolean
    tanggalKematian?: boolean
  }, ExtArgs["result"]["sapi"]>

  export type SapiSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jenis?: boolean
    bobot?: boolean
    image?: boolean
    tanggalLahir?: boolean
    tanggalKematian?: boolean
  }, ExtArgs["result"]["sapi"]>

  export type SapiSelectScalar = {
    id?: boolean
    jenis?: boolean
    bobot?: boolean
    image?: boolean
    tanggalLahir?: boolean
    tanggalKematian?: boolean
  }

  export type SapiOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "jenis" | "bobot" | "image" | "tanggalLahir" | "tanggalKematian", ExtArgs["result"]["sapi"]>
  export type SapiInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jadwal?: boolean | Sapi$jadwalArgs<ExtArgs>
    _count?: boolean | SapiCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SapiIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SapiIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SapiPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Sapi"
    objects: {
      jadwal: Prisma.$JadwalMakanPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      jenis: string
      bobot: number
      image: string
      tanggalLahir: Date
      tanggalKematian: Date | null
    }, ExtArgs["result"]["sapi"]>
    composites: {}
  }

  type SapiGetPayload<S extends boolean | null | undefined | SapiDefaultArgs> = $Result.GetResult<Prisma.$SapiPayload, S>

  type SapiCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SapiFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SapiCountAggregateInputType | true
    }

  export interface SapiDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Sapi'], meta: { name: 'Sapi' } }
    /**
     * Find zero or one Sapi that matches the filter.
     * @param {SapiFindUniqueArgs} args - Arguments to find a Sapi
     * @example
     * // Get one Sapi
     * const sapi = await prisma.sapi.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SapiFindUniqueArgs>(args: SelectSubset<T, SapiFindUniqueArgs<ExtArgs>>): Prisma__SapiClient<$Result.GetResult<Prisma.$SapiPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Sapi that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SapiFindUniqueOrThrowArgs} args - Arguments to find a Sapi
     * @example
     * // Get one Sapi
     * const sapi = await prisma.sapi.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SapiFindUniqueOrThrowArgs>(args: SelectSubset<T, SapiFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SapiClient<$Result.GetResult<Prisma.$SapiPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sapi that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SapiFindFirstArgs} args - Arguments to find a Sapi
     * @example
     * // Get one Sapi
     * const sapi = await prisma.sapi.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SapiFindFirstArgs>(args?: SelectSubset<T, SapiFindFirstArgs<ExtArgs>>): Prisma__SapiClient<$Result.GetResult<Prisma.$SapiPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sapi that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SapiFindFirstOrThrowArgs} args - Arguments to find a Sapi
     * @example
     * // Get one Sapi
     * const sapi = await prisma.sapi.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SapiFindFirstOrThrowArgs>(args?: SelectSubset<T, SapiFindFirstOrThrowArgs<ExtArgs>>): Prisma__SapiClient<$Result.GetResult<Prisma.$SapiPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sapis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SapiFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sapis
     * const sapis = await prisma.sapi.findMany()
     * 
     * // Get first 10 Sapis
     * const sapis = await prisma.sapi.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sapiWithIdOnly = await prisma.sapi.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SapiFindManyArgs>(args?: SelectSubset<T, SapiFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SapiPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Sapi.
     * @param {SapiCreateArgs} args - Arguments to create a Sapi.
     * @example
     * // Create one Sapi
     * const Sapi = await prisma.sapi.create({
     *   data: {
     *     // ... data to create a Sapi
     *   }
     * })
     * 
     */
    create<T extends SapiCreateArgs>(args: SelectSubset<T, SapiCreateArgs<ExtArgs>>): Prisma__SapiClient<$Result.GetResult<Prisma.$SapiPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sapis.
     * @param {SapiCreateManyArgs} args - Arguments to create many Sapis.
     * @example
     * // Create many Sapis
     * const sapi = await prisma.sapi.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SapiCreateManyArgs>(args?: SelectSubset<T, SapiCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sapis and returns the data saved in the database.
     * @param {SapiCreateManyAndReturnArgs} args - Arguments to create many Sapis.
     * @example
     * // Create many Sapis
     * const sapi = await prisma.sapi.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sapis and only return the `id`
     * const sapiWithIdOnly = await prisma.sapi.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SapiCreateManyAndReturnArgs>(args?: SelectSubset<T, SapiCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SapiPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Sapi.
     * @param {SapiDeleteArgs} args - Arguments to delete one Sapi.
     * @example
     * // Delete one Sapi
     * const Sapi = await prisma.sapi.delete({
     *   where: {
     *     // ... filter to delete one Sapi
     *   }
     * })
     * 
     */
    delete<T extends SapiDeleteArgs>(args: SelectSubset<T, SapiDeleteArgs<ExtArgs>>): Prisma__SapiClient<$Result.GetResult<Prisma.$SapiPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Sapi.
     * @param {SapiUpdateArgs} args - Arguments to update one Sapi.
     * @example
     * // Update one Sapi
     * const sapi = await prisma.sapi.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SapiUpdateArgs>(args: SelectSubset<T, SapiUpdateArgs<ExtArgs>>): Prisma__SapiClient<$Result.GetResult<Prisma.$SapiPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sapis.
     * @param {SapiDeleteManyArgs} args - Arguments to filter Sapis to delete.
     * @example
     * // Delete a few Sapis
     * const { count } = await prisma.sapi.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SapiDeleteManyArgs>(args?: SelectSubset<T, SapiDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sapis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SapiUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sapis
     * const sapi = await prisma.sapi.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SapiUpdateManyArgs>(args: SelectSubset<T, SapiUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sapis and returns the data updated in the database.
     * @param {SapiUpdateManyAndReturnArgs} args - Arguments to update many Sapis.
     * @example
     * // Update many Sapis
     * const sapi = await prisma.sapi.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sapis and only return the `id`
     * const sapiWithIdOnly = await prisma.sapi.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SapiUpdateManyAndReturnArgs>(args: SelectSubset<T, SapiUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SapiPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Sapi.
     * @param {SapiUpsertArgs} args - Arguments to update or create a Sapi.
     * @example
     * // Update or create a Sapi
     * const sapi = await prisma.sapi.upsert({
     *   create: {
     *     // ... data to create a Sapi
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Sapi we want to update
     *   }
     * })
     */
    upsert<T extends SapiUpsertArgs>(args: SelectSubset<T, SapiUpsertArgs<ExtArgs>>): Prisma__SapiClient<$Result.GetResult<Prisma.$SapiPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sapis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SapiCountArgs} args - Arguments to filter Sapis to count.
     * @example
     * // Count the number of Sapis
     * const count = await prisma.sapi.count({
     *   where: {
     *     // ... the filter for the Sapis we want to count
     *   }
     * })
    **/
    count<T extends SapiCountArgs>(
      args?: Subset<T, SapiCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SapiCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Sapi.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SapiAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SapiAggregateArgs>(args: Subset<T, SapiAggregateArgs>): Prisma.PrismaPromise<GetSapiAggregateType<T>>

    /**
     * Group by Sapi.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SapiGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SapiGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SapiGroupByArgs['orderBy'] }
        : { orderBy?: SapiGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SapiGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSapiGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Sapi model
   */
  readonly fields: SapiFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Sapi.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SapiClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    jadwal<T extends Sapi$jadwalArgs<ExtArgs> = {}>(args?: Subset<T, Sapi$jadwalArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JadwalMakanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Sapi model
   */
  interface SapiFieldRefs {
    readonly id: FieldRef<"Sapi", 'Int'>
    readonly jenis: FieldRef<"Sapi", 'String'>
    readonly bobot: FieldRef<"Sapi", 'Float'>
    readonly image: FieldRef<"Sapi", 'String'>
    readonly tanggalLahir: FieldRef<"Sapi", 'DateTime'>
    readonly tanggalKematian: FieldRef<"Sapi", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Sapi findUnique
   */
  export type SapiFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sapi
     */
    select?: SapiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sapi
     */
    omit?: SapiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SapiInclude<ExtArgs> | null
    /**
     * Filter, which Sapi to fetch.
     */
    where: SapiWhereUniqueInput
  }

  /**
   * Sapi findUniqueOrThrow
   */
  export type SapiFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sapi
     */
    select?: SapiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sapi
     */
    omit?: SapiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SapiInclude<ExtArgs> | null
    /**
     * Filter, which Sapi to fetch.
     */
    where: SapiWhereUniqueInput
  }

  /**
   * Sapi findFirst
   */
  export type SapiFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sapi
     */
    select?: SapiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sapi
     */
    omit?: SapiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SapiInclude<ExtArgs> | null
    /**
     * Filter, which Sapi to fetch.
     */
    where?: SapiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sapis to fetch.
     */
    orderBy?: SapiOrderByWithRelationInput | SapiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sapis.
     */
    cursor?: SapiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sapis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sapis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sapis.
     */
    distinct?: SapiScalarFieldEnum | SapiScalarFieldEnum[]
  }

  /**
   * Sapi findFirstOrThrow
   */
  export type SapiFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sapi
     */
    select?: SapiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sapi
     */
    omit?: SapiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SapiInclude<ExtArgs> | null
    /**
     * Filter, which Sapi to fetch.
     */
    where?: SapiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sapis to fetch.
     */
    orderBy?: SapiOrderByWithRelationInput | SapiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sapis.
     */
    cursor?: SapiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sapis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sapis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sapis.
     */
    distinct?: SapiScalarFieldEnum | SapiScalarFieldEnum[]
  }

  /**
   * Sapi findMany
   */
  export type SapiFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sapi
     */
    select?: SapiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sapi
     */
    omit?: SapiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SapiInclude<ExtArgs> | null
    /**
     * Filter, which Sapis to fetch.
     */
    where?: SapiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sapis to fetch.
     */
    orderBy?: SapiOrderByWithRelationInput | SapiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sapis.
     */
    cursor?: SapiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sapis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sapis.
     */
    skip?: number
    distinct?: SapiScalarFieldEnum | SapiScalarFieldEnum[]
  }

  /**
   * Sapi create
   */
  export type SapiCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sapi
     */
    select?: SapiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sapi
     */
    omit?: SapiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SapiInclude<ExtArgs> | null
    /**
     * The data needed to create a Sapi.
     */
    data: XOR<SapiCreateInput, SapiUncheckedCreateInput>
  }

  /**
   * Sapi createMany
   */
  export type SapiCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sapis.
     */
    data: SapiCreateManyInput | SapiCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Sapi createManyAndReturn
   */
  export type SapiCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sapi
     */
    select?: SapiSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Sapi
     */
    omit?: SapiOmit<ExtArgs> | null
    /**
     * The data used to create many Sapis.
     */
    data: SapiCreateManyInput | SapiCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Sapi update
   */
  export type SapiUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sapi
     */
    select?: SapiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sapi
     */
    omit?: SapiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SapiInclude<ExtArgs> | null
    /**
     * The data needed to update a Sapi.
     */
    data: XOR<SapiUpdateInput, SapiUncheckedUpdateInput>
    /**
     * Choose, which Sapi to update.
     */
    where: SapiWhereUniqueInput
  }

  /**
   * Sapi updateMany
   */
  export type SapiUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sapis.
     */
    data: XOR<SapiUpdateManyMutationInput, SapiUncheckedUpdateManyInput>
    /**
     * Filter which Sapis to update
     */
    where?: SapiWhereInput
    /**
     * Limit how many Sapis to update.
     */
    limit?: number
  }

  /**
   * Sapi updateManyAndReturn
   */
  export type SapiUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sapi
     */
    select?: SapiSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Sapi
     */
    omit?: SapiOmit<ExtArgs> | null
    /**
     * The data used to update Sapis.
     */
    data: XOR<SapiUpdateManyMutationInput, SapiUncheckedUpdateManyInput>
    /**
     * Filter which Sapis to update
     */
    where?: SapiWhereInput
    /**
     * Limit how many Sapis to update.
     */
    limit?: number
  }

  /**
   * Sapi upsert
   */
  export type SapiUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sapi
     */
    select?: SapiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sapi
     */
    omit?: SapiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SapiInclude<ExtArgs> | null
    /**
     * The filter to search for the Sapi to update in case it exists.
     */
    where: SapiWhereUniqueInput
    /**
     * In case the Sapi found by the `where` argument doesn't exist, create a new Sapi with this data.
     */
    create: XOR<SapiCreateInput, SapiUncheckedCreateInput>
    /**
     * In case the Sapi was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SapiUpdateInput, SapiUncheckedUpdateInput>
  }

  /**
   * Sapi delete
   */
  export type SapiDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sapi
     */
    select?: SapiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sapi
     */
    omit?: SapiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SapiInclude<ExtArgs> | null
    /**
     * Filter which Sapi to delete.
     */
    where: SapiWhereUniqueInput
  }

  /**
   * Sapi deleteMany
   */
  export type SapiDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sapis to delete
     */
    where?: SapiWhereInput
    /**
     * Limit how many Sapis to delete.
     */
    limit?: number
  }

  /**
   * Sapi.jadwal
   */
  export type Sapi$jadwalArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JadwalMakan
     */
    select?: JadwalMakanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JadwalMakan
     */
    omit?: JadwalMakanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JadwalMakanInclude<ExtArgs> | null
    where?: JadwalMakanWhereInput
    orderBy?: JadwalMakanOrderByWithRelationInput | JadwalMakanOrderByWithRelationInput[]
    cursor?: JadwalMakanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JadwalMakanScalarFieldEnum | JadwalMakanScalarFieldEnum[]
  }

  /**
   * Sapi without action
   */
  export type SapiDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sapi
     */
    select?: SapiSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sapi
     */
    omit?: SapiOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SapiInclude<ExtArgs> | null
  }


  /**
   * Model Pakan
   */

  export type AggregatePakan = {
    _count: PakanCountAggregateOutputType | null
    _avg: PakanAvgAggregateOutputType | null
    _sum: PakanSumAggregateOutputType | null
    _min: PakanMinAggregateOutputType | null
    _max: PakanMaxAggregateOutputType | null
  }

  export type PakanAvgAggregateOutputType = {
    id: number | null
    banyakStok: number | null
    harga: number | null
  }

  export type PakanSumAggregateOutputType = {
    id: number | null
    banyakStok: number | null
    harga: number | null
  }

  export type PakanMinAggregateOutputType = {
    id: number | null
    jenis: string | null
    banyakStok: number | null
    harga: number | null
    image: string | null
  }

  export type PakanMaxAggregateOutputType = {
    id: number | null
    jenis: string | null
    banyakStok: number | null
    harga: number | null
    image: string | null
  }

  export type PakanCountAggregateOutputType = {
    id: number
    jenis: number
    banyakStok: number
    harga: number
    image: number
    _all: number
  }


  export type PakanAvgAggregateInputType = {
    id?: true
    banyakStok?: true
    harga?: true
  }

  export type PakanSumAggregateInputType = {
    id?: true
    banyakStok?: true
    harga?: true
  }

  export type PakanMinAggregateInputType = {
    id?: true
    jenis?: true
    banyakStok?: true
    harga?: true
    image?: true
  }

  export type PakanMaxAggregateInputType = {
    id?: true
    jenis?: true
    banyakStok?: true
    harga?: true
    image?: true
  }

  export type PakanCountAggregateInputType = {
    id?: true
    jenis?: true
    banyakStok?: true
    harga?: true
    image?: true
    _all?: true
  }

  export type PakanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pakan to aggregate.
     */
    where?: PakanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pakans to fetch.
     */
    orderBy?: PakanOrderByWithRelationInput | PakanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PakanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pakans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pakans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pakans
    **/
    _count?: true | PakanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PakanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PakanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PakanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PakanMaxAggregateInputType
  }

  export type GetPakanAggregateType<T extends PakanAggregateArgs> = {
        [P in keyof T & keyof AggregatePakan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePakan[P]>
      : GetScalarType<T[P], AggregatePakan[P]>
  }




  export type PakanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PakanWhereInput
    orderBy?: PakanOrderByWithAggregationInput | PakanOrderByWithAggregationInput[]
    by: PakanScalarFieldEnum[] | PakanScalarFieldEnum
    having?: PakanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PakanCountAggregateInputType | true
    _avg?: PakanAvgAggregateInputType
    _sum?: PakanSumAggregateInputType
    _min?: PakanMinAggregateInputType
    _max?: PakanMaxAggregateInputType
  }

  export type PakanGroupByOutputType = {
    id: number
    jenis: string
    banyakStok: number
    harga: number | null
    image: string
    _count: PakanCountAggregateOutputType | null
    _avg: PakanAvgAggregateOutputType | null
    _sum: PakanSumAggregateOutputType | null
    _min: PakanMinAggregateOutputType | null
    _max: PakanMaxAggregateOutputType | null
  }

  type GetPakanGroupByPayload<T extends PakanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PakanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PakanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PakanGroupByOutputType[P]>
            : GetScalarType<T[P], PakanGroupByOutputType[P]>
        }
      >
    >


  export type PakanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jenis?: boolean
    banyakStok?: boolean
    harga?: boolean
    image?: boolean
    jadwal?: boolean | Pakan$jadwalArgs<ExtArgs>
    _count?: boolean | PakanCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pakan"]>

  export type PakanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jenis?: boolean
    banyakStok?: boolean
    harga?: boolean
    image?: boolean
  }, ExtArgs["result"]["pakan"]>

  export type PakanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    jenis?: boolean
    banyakStok?: boolean
    harga?: boolean
    image?: boolean
  }, ExtArgs["result"]["pakan"]>

  export type PakanSelectScalar = {
    id?: boolean
    jenis?: boolean
    banyakStok?: boolean
    harga?: boolean
    image?: boolean
  }

  export type PakanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "jenis" | "banyakStok" | "harga" | "image", ExtArgs["result"]["pakan"]>
  export type PakanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jadwal?: boolean | Pakan$jadwalArgs<ExtArgs>
    _count?: boolean | PakanCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PakanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PakanIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PakanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pakan"
    objects: {
      jadwal: Prisma.$JadwalMakanPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      jenis: string
      banyakStok: number
      harga: number | null
      image: string
    }, ExtArgs["result"]["pakan"]>
    composites: {}
  }

  type PakanGetPayload<S extends boolean | null | undefined | PakanDefaultArgs> = $Result.GetResult<Prisma.$PakanPayload, S>

  type PakanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PakanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PakanCountAggregateInputType | true
    }

  export interface PakanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pakan'], meta: { name: 'Pakan' } }
    /**
     * Find zero or one Pakan that matches the filter.
     * @param {PakanFindUniqueArgs} args - Arguments to find a Pakan
     * @example
     * // Get one Pakan
     * const pakan = await prisma.pakan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PakanFindUniqueArgs>(args: SelectSubset<T, PakanFindUniqueArgs<ExtArgs>>): Prisma__PakanClient<$Result.GetResult<Prisma.$PakanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pakan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PakanFindUniqueOrThrowArgs} args - Arguments to find a Pakan
     * @example
     * // Get one Pakan
     * const pakan = await prisma.pakan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PakanFindUniqueOrThrowArgs>(args: SelectSubset<T, PakanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PakanClient<$Result.GetResult<Prisma.$PakanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pakan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PakanFindFirstArgs} args - Arguments to find a Pakan
     * @example
     * // Get one Pakan
     * const pakan = await prisma.pakan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PakanFindFirstArgs>(args?: SelectSubset<T, PakanFindFirstArgs<ExtArgs>>): Prisma__PakanClient<$Result.GetResult<Prisma.$PakanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pakan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PakanFindFirstOrThrowArgs} args - Arguments to find a Pakan
     * @example
     * // Get one Pakan
     * const pakan = await prisma.pakan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PakanFindFirstOrThrowArgs>(args?: SelectSubset<T, PakanFindFirstOrThrowArgs<ExtArgs>>): Prisma__PakanClient<$Result.GetResult<Prisma.$PakanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pakans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PakanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pakans
     * const pakans = await prisma.pakan.findMany()
     * 
     * // Get first 10 Pakans
     * const pakans = await prisma.pakan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pakanWithIdOnly = await prisma.pakan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PakanFindManyArgs>(args?: SelectSubset<T, PakanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PakanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pakan.
     * @param {PakanCreateArgs} args - Arguments to create a Pakan.
     * @example
     * // Create one Pakan
     * const Pakan = await prisma.pakan.create({
     *   data: {
     *     // ... data to create a Pakan
     *   }
     * })
     * 
     */
    create<T extends PakanCreateArgs>(args: SelectSubset<T, PakanCreateArgs<ExtArgs>>): Prisma__PakanClient<$Result.GetResult<Prisma.$PakanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pakans.
     * @param {PakanCreateManyArgs} args - Arguments to create many Pakans.
     * @example
     * // Create many Pakans
     * const pakan = await prisma.pakan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PakanCreateManyArgs>(args?: SelectSubset<T, PakanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pakans and returns the data saved in the database.
     * @param {PakanCreateManyAndReturnArgs} args - Arguments to create many Pakans.
     * @example
     * // Create many Pakans
     * const pakan = await prisma.pakan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pakans and only return the `id`
     * const pakanWithIdOnly = await prisma.pakan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PakanCreateManyAndReturnArgs>(args?: SelectSubset<T, PakanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PakanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Pakan.
     * @param {PakanDeleteArgs} args - Arguments to delete one Pakan.
     * @example
     * // Delete one Pakan
     * const Pakan = await prisma.pakan.delete({
     *   where: {
     *     // ... filter to delete one Pakan
     *   }
     * })
     * 
     */
    delete<T extends PakanDeleteArgs>(args: SelectSubset<T, PakanDeleteArgs<ExtArgs>>): Prisma__PakanClient<$Result.GetResult<Prisma.$PakanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pakan.
     * @param {PakanUpdateArgs} args - Arguments to update one Pakan.
     * @example
     * // Update one Pakan
     * const pakan = await prisma.pakan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PakanUpdateArgs>(args: SelectSubset<T, PakanUpdateArgs<ExtArgs>>): Prisma__PakanClient<$Result.GetResult<Prisma.$PakanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pakans.
     * @param {PakanDeleteManyArgs} args - Arguments to filter Pakans to delete.
     * @example
     * // Delete a few Pakans
     * const { count } = await prisma.pakan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PakanDeleteManyArgs>(args?: SelectSubset<T, PakanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pakans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PakanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pakans
     * const pakan = await prisma.pakan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PakanUpdateManyArgs>(args: SelectSubset<T, PakanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pakans and returns the data updated in the database.
     * @param {PakanUpdateManyAndReturnArgs} args - Arguments to update many Pakans.
     * @example
     * // Update many Pakans
     * const pakan = await prisma.pakan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pakans and only return the `id`
     * const pakanWithIdOnly = await prisma.pakan.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PakanUpdateManyAndReturnArgs>(args: SelectSubset<T, PakanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PakanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Pakan.
     * @param {PakanUpsertArgs} args - Arguments to update or create a Pakan.
     * @example
     * // Update or create a Pakan
     * const pakan = await prisma.pakan.upsert({
     *   create: {
     *     // ... data to create a Pakan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pakan we want to update
     *   }
     * })
     */
    upsert<T extends PakanUpsertArgs>(args: SelectSubset<T, PakanUpsertArgs<ExtArgs>>): Prisma__PakanClient<$Result.GetResult<Prisma.$PakanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pakans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PakanCountArgs} args - Arguments to filter Pakans to count.
     * @example
     * // Count the number of Pakans
     * const count = await prisma.pakan.count({
     *   where: {
     *     // ... the filter for the Pakans we want to count
     *   }
     * })
    **/
    count<T extends PakanCountArgs>(
      args?: Subset<T, PakanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PakanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pakan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PakanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PakanAggregateArgs>(args: Subset<T, PakanAggregateArgs>): Prisma.PrismaPromise<GetPakanAggregateType<T>>

    /**
     * Group by Pakan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PakanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PakanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PakanGroupByArgs['orderBy'] }
        : { orderBy?: PakanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PakanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPakanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pakan model
   */
  readonly fields: PakanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pakan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PakanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    jadwal<T extends Pakan$jadwalArgs<ExtArgs> = {}>(args?: Subset<T, Pakan$jadwalArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JadwalMakanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Pakan model
   */
  interface PakanFieldRefs {
    readonly id: FieldRef<"Pakan", 'Int'>
    readonly jenis: FieldRef<"Pakan", 'String'>
    readonly banyakStok: FieldRef<"Pakan", 'Float'>
    readonly harga: FieldRef<"Pakan", 'Float'>
    readonly image: FieldRef<"Pakan", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Pakan findUnique
   */
  export type PakanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pakan
     */
    select?: PakanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pakan
     */
    omit?: PakanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PakanInclude<ExtArgs> | null
    /**
     * Filter, which Pakan to fetch.
     */
    where: PakanWhereUniqueInput
  }

  /**
   * Pakan findUniqueOrThrow
   */
  export type PakanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pakan
     */
    select?: PakanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pakan
     */
    omit?: PakanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PakanInclude<ExtArgs> | null
    /**
     * Filter, which Pakan to fetch.
     */
    where: PakanWhereUniqueInput
  }

  /**
   * Pakan findFirst
   */
  export type PakanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pakan
     */
    select?: PakanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pakan
     */
    omit?: PakanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PakanInclude<ExtArgs> | null
    /**
     * Filter, which Pakan to fetch.
     */
    where?: PakanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pakans to fetch.
     */
    orderBy?: PakanOrderByWithRelationInput | PakanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pakans.
     */
    cursor?: PakanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pakans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pakans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pakans.
     */
    distinct?: PakanScalarFieldEnum | PakanScalarFieldEnum[]
  }

  /**
   * Pakan findFirstOrThrow
   */
  export type PakanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pakan
     */
    select?: PakanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pakan
     */
    omit?: PakanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PakanInclude<ExtArgs> | null
    /**
     * Filter, which Pakan to fetch.
     */
    where?: PakanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pakans to fetch.
     */
    orderBy?: PakanOrderByWithRelationInput | PakanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pakans.
     */
    cursor?: PakanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pakans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pakans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pakans.
     */
    distinct?: PakanScalarFieldEnum | PakanScalarFieldEnum[]
  }

  /**
   * Pakan findMany
   */
  export type PakanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pakan
     */
    select?: PakanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pakan
     */
    omit?: PakanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PakanInclude<ExtArgs> | null
    /**
     * Filter, which Pakans to fetch.
     */
    where?: PakanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pakans to fetch.
     */
    orderBy?: PakanOrderByWithRelationInput | PakanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pakans.
     */
    cursor?: PakanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pakans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pakans.
     */
    skip?: number
    distinct?: PakanScalarFieldEnum | PakanScalarFieldEnum[]
  }

  /**
   * Pakan create
   */
  export type PakanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pakan
     */
    select?: PakanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pakan
     */
    omit?: PakanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PakanInclude<ExtArgs> | null
    /**
     * The data needed to create a Pakan.
     */
    data: XOR<PakanCreateInput, PakanUncheckedCreateInput>
  }

  /**
   * Pakan createMany
   */
  export type PakanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pakans.
     */
    data: PakanCreateManyInput | PakanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pakan createManyAndReturn
   */
  export type PakanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pakan
     */
    select?: PakanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pakan
     */
    omit?: PakanOmit<ExtArgs> | null
    /**
     * The data used to create many Pakans.
     */
    data: PakanCreateManyInput | PakanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pakan update
   */
  export type PakanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pakan
     */
    select?: PakanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pakan
     */
    omit?: PakanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PakanInclude<ExtArgs> | null
    /**
     * The data needed to update a Pakan.
     */
    data: XOR<PakanUpdateInput, PakanUncheckedUpdateInput>
    /**
     * Choose, which Pakan to update.
     */
    where: PakanWhereUniqueInput
  }

  /**
   * Pakan updateMany
   */
  export type PakanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pakans.
     */
    data: XOR<PakanUpdateManyMutationInput, PakanUncheckedUpdateManyInput>
    /**
     * Filter which Pakans to update
     */
    where?: PakanWhereInput
    /**
     * Limit how many Pakans to update.
     */
    limit?: number
  }

  /**
   * Pakan updateManyAndReturn
   */
  export type PakanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pakan
     */
    select?: PakanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pakan
     */
    omit?: PakanOmit<ExtArgs> | null
    /**
     * The data used to update Pakans.
     */
    data: XOR<PakanUpdateManyMutationInput, PakanUncheckedUpdateManyInput>
    /**
     * Filter which Pakans to update
     */
    where?: PakanWhereInput
    /**
     * Limit how many Pakans to update.
     */
    limit?: number
  }

  /**
   * Pakan upsert
   */
  export type PakanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pakan
     */
    select?: PakanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pakan
     */
    omit?: PakanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PakanInclude<ExtArgs> | null
    /**
     * The filter to search for the Pakan to update in case it exists.
     */
    where: PakanWhereUniqueInput
    /**
     * In case the Pakan found by the `where` argument doesn't exist, create a new Pakan with this data.
     */
    create: XOR<PakanCreateInput, PakanUncheckedCreateInput>
    /**
     * In case the Pakan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PakanUpdateInput, PakanUncheckedUpdateInput>
  }

  /**
   * Pakan delete
   */
  export type PakanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pakan
     */
    select?: PakanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pakan
     */
    omit?: PakanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PakanInclude<ExtArgs> | null
    /**
     * Filter which Pakan to delete.
     */
    where: PakanWhereUniqueInput
  }

  /**
   * Pakan deleteMany
   */
  export type PakanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pakans to delete
     */
    where?: PakanWhereInput
    /**
     * Limit how many Pakans to delete.
     */
    limit?: number
  }

  /**
   * Pakan.jadwal
   */
  export type Pakan$jadwalArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JadwalMakan
     */
    select?: JadwalMakanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JadwalMakan
     */
    omit?: JadwalMakanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JadwalMakanInclude<ExtArgs> | null
    where?: JadwalMakanWhereInput
    orderBy?: JadwalMakanOrderByWithRelationInput | JadwalMakanOrderByWithRelationInput[]
    cursor?: JadwalMakanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JadwalMakanScalarFieldEnum | JadwalMakanScalarFieldEnum[]
  }

  /**
   * Pakan without action
   */
  export type PakanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pakan
     */
    select?: PakanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pakan
     */
    omit?: PakanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PakanInclude<ExtArgs> | null
  }


  /**
   * Model JadwalMakan
   */

  export type AggregateJadwalMakan = {
    _count: JadwalMakanCountAggregateOutputType | null
    _avg: JadwalMakanAvgAggregateOutputType | null
    _sum: JadwalMakanSumAggregateOutputType | null
    _min: JadwalMakanMinAggregateOutputType | null
    _max: JadwalMakanMaxAggregateOutputType | null
  }

  export type JadwalMakanAvgAggregateOutputType = {
    id: number | null
    sapiId: number | null
    pakanId: number | null
    userId: number | null
  }

  export type JadwalMakanSumAggregateOutputType = {
    id: number | null
    sapiId: number | null
    pakanId: number | null
    userId: number | null
  }

  export type JadwalMakanMinAggregateOutputType = {
    id: number | null
    tanggal: Date | null
    sapiId: number | null
    pakanId: number | null
    userId: number | null
  }

  export type JadwalMakanMaxAggregateOutputType = {
    id: number | null
    tanggal: Date | null
    sapiId: number | null
    pakanId: number | null
    userId: number | null
  }

  export type JadwalMakanCountAggregateOutputType = {
    id: number
    tanggal: number
    sapiId: number
    pakanId: number
    userId: number
    _all: number
  }


  export type JadwalMakanAvgAggregateInputType = {
    id?: true
    sapiId?: true
    pakanId?: true
    userId?: true
  }

  export type JadwalMakanSumAggregateInputType = {
    id?: true
    sapiId?: true
    pakanId?: true
    userId?: true
  }

  export type JadwalMakanMinAggregateInputType = {
    id?: true
    tanggal?: true
    sapiId?: true
    pakanId?: true
    userId?: true
  }

  export type JadwalMakanMaxAggregateInputType = {
    id?: true
    tanggal?: true
    sapiId?: true
    pakanId?: true
    userId?: true
  }

  export type JadwalMakanCountAggregateInputType = {
    id?: true
    tanggal?: true
    sapiId?: true
    pakanId?: true
    userId?: true
    _all?: true
  }

  export type JadwalMakanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JadwalMakan to aggregate.
     */
    where?: JadwalMakanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JadwalMakans to fetch.
     */
    orderBy?: JadwalMakanOrderByWithRelationInput | JadwalMakanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JadwalMakanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JadwalMakans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JadwalMakans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JadwalMakans
    **/
    _count?: true | JadwalMakanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JadwalMakanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JadwalMakanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JadwalMakanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JadwalMakanMaxAggregateInputType
  }

  export type GetJadwalMakanAggregateType<T extends JadwalMakanAggregateArgs> = {
        [P in keyof T & keyof AggregateJadwalMakan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJadwalMakan[P]>
      : GetScalarType<T[P], AggregateJadwalMakan[P]>
  }




  export type JadwalMakanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JadwalMakanWhereInput
    orderBy?: JadwalMakanOrderByWithAggregationInput | JadwalMakanOrderByWithAggregationInput[]
    by: JadwalMakanScalarFieldEnum[] | JadwalMakanScalarFieldEnum
    having?: JadwalMakanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JadwalMakanCountAggregateInputType | true
    _avg?: JadwalMakanAvgAggregateInputType
    _sum?: JadwalMakanSumAggregateInputType
    _min?: JadwalMakanMinAggregateInputType
    _max?: JadwalMakanMaxAggregateInputType
  }

  export type JadwalMakanGroupByOutputType = {
    id: number
    tanggal: Date
    sapiId: number
    pakanId: number
    userId: number
    _count: JadwalMakanCountAggregateOutputType | null
    _avg: JadwalMakanAvgAggregateOutputType | null
    _sum: JadwalMakanSumAggregateOutputType | null
    _min: JadwalMakanMinAggregateOutputType | null
    _max: JadwalMakanMaxAggregateOutputType | null
  }

  type GetJadwalMakanGroupByPayload<T extends JadwalMakanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JadwalMakanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JadwalMakanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JadwalMakanGroupByOutputType[P]>
            : GetScalarType<T[P], JadwalMakanGroupByOutputType[P]>
        }
      >
    >


  export type JadwalMakanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tanggal?: boolean
    sapiId?: boolean
    pakanId?: boolean
    userId?: boolean
    sapi?: boolean | SapiDefaultArgs<ExtArgs>
    pakan?: boolean | PakanDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jadwalMakan"]>

  export type JadwalMakanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tanggal?: boolean
    sapiId?: boolean
    pakanId?: boolean
    userId?: boolean
    sapi?: boolean | SapiDefaultArgs<ExtArgs>
    pakan?: boolean | PakanDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jadwalMakan"]>

  export type JadwalMakanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tanggal?: boolean
    sapiId?: boolean
    pakanId?: boolean
    userId?: boolean
    sapi?: boolean | SapiDefaultArgs<ExtArgs>
    pakan?: boolean | PakanDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jadwalMakan"]>

  export type JadwalMakanSelectScalar = {
    id?: boolean
    tanggal?: boolean
    sapiId?: boolean
    pakanId?: boolean
    userId?: boolean
  }

  export type JadwalMakanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tanggal" | "sapiId" | "pakanId" | "userId", ExtArgs["result"]["jadwalMakan"]>
  export type JadwalMakanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sapi?: boolean | SapiDefaultArgs<ExtArgs>
    pakan?: boolean | PakanDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type JadwalMakanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sapi?: boolean | SapiDefaultArgs<ExtArgs>
    pakan?: boolean | PakanDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type JadwalMakanIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sapi?: boolean | SapiDefaultArgs<ExtArgs>
    pakan?: boolean | PakanDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $JadwalMakanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JadwalMakan"
    objects: {
      sapi: Prisma.$SapiPayload<ExtArgs>
      pakan: Prisma.$PakanPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      tanggal: Date
      sapiId: number
      pakanId: number
      userId: number
    }, ExtArgs["result"]["jadwalMakan"]>
    composites: {}
  }

  type JadwalMakanGetPayload<S extends boolean | null | undefined | JadwalMakanDefaultArgs> = $Result.GetResult<Prisma.$JadwalMakanPayload, S>

  type JadwalMakanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JadwalMakanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JadwalMakanCountAggregateInputType | true
    }

  export interface JadwalMakanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JadwalMakan'], meta: { name: 'JadwalMakan' } }
    /**
     * Find zero or one JadwalMakan that matches the filter.
     * @param {JadwalMakanFindUniqueArgs} args - Arguments to find a JadwalMakan
     * @example
     * // Get one JadwalMakan
     * const jadwalMakan = await prisma.jadwalMakan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JadwalMakanFindUniqueArgs>(args: SelectSubset<T, JadwalMakanFindUniqueArgs<ExtArgs>>): Prisma__JadwalMakanClient<$Result.GetResult<Prisma.$JadwalMakanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one JadwalMakan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JadwalMakanFindUniqueOrThrowArgs} args - Arguments to find a JadwalMakan
     * @example
     * // Get one JadwalMakan
     * const jadwalMakan = await prisma.jadwalMakan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JadwalMakanFindUniqueOrThrowArgs>(args: SelectSubset<T, JadwalMakanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JadwalMakanClient<$Result.GetResult<Prisma.$JadwalMakanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JadwalMakan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JadwalMakanFindFirstArgs} args - Arguments to find a JadwalMakan
     * @example
     * // Get one JadwalMakan
     * const jadwalMakan = await prisma.jadwalMakan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JadwalMakanFindFirstArgs>(args?: SelectSubset<T, JadwalMakanFindFirstArgs<ExtArgs>>): Prisma__JadwalMakanClient<$Result.GetResult<Prisma.$JadwalMakanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JadwalMakan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JadwalMakanFindFirstOrThrowArgs} args - Arguments to find a JadwalMakan
     * @example
     * // Get one JadwalMakan
     * const jadwalMakan = await prisma.jadwalMakan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JadwalMakanFindFirstOrThrowArgs>(args?: SelectSubset<T, JadwalMakanFindFirstOrThrowArgs<ExtArgs>>): Prisma__JadwalMakanClient<$Result.GetResult<Prisma.$JadwalMakanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more JadwalMakans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JadwalMakanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JadwalMakans
     * const jadwalMakans = await prisma.jadwalMakan.findMany()
     * 
     * // Get first 10 JadwalMakans
     * const jadwalMakans = await prisma.jadwalMakan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jadwalMakanWithIdOnly = await prisma.jadwalMakan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JadwalMakanFindManyArgs>(args?: SelectSubset<T, JadwalMakanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JadwalMakanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a JadwalMakan.
     * @param {JadwalMakanCreateArgs} args - Arguments to create a JadwalMakan.
     * @example
     * // Create one JadwalMakan
     * const JadwalMakan = await prisma.jadwalMakan.create({
     *   data: {
     *     // ... data to create a JadwalMakan
     *   }
     * })
     * 
     */
    create<T extends JadwalMakanCreateArgs>(args: SelectSubset<T, JadwalMakanCreateArgs<ExtArgs>>): Prisma__JadwalMakanClient<$Result.GetResult<Prisma.$JadwalMakanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many JadwalMakans.
     * @param {JadwalMakanCreateManyArgs} args - Arguments to create many JadwalMakans.
     * @example
     * // Create many JadwalMakans
     * const jadwalMakan = await prisma.jadwalMakan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JadwalMakanCreateManyArgs>(args?: SelectSubset<T, JadwalMakanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many JadwalMakans and returns the data saved in the database.
     * @param {JadwalMakanCreateManyAndReturnArgs} args - Arguments to create many JadwalMakans.
     * @example
     * // Create many JadwalMakans
     * const jadwalMakan = await prisma.jadwalMakan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many JadwalMakans and only return the `id`
     * const jadwalMakanWithIdOnly = await prisma.jadwalMakan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JadwalMakanCreateManyAndReturnArgs>(args?: SelectSubset<T, JadwalMakanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JadwalMakanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a JadwalMakan.
     * @param {JadwalMakanDeleteArgs} args - Arguments to delete one JadwalMakan.
     * @example
     * // Delete one JadwalMakan
     * const JadwalMakan = await prisma.jadwalMakan.delete({
     *   where: {
     *     // ... filter to delete one JadwalMakan
     *   }
     * })
     * 
     */
    delete<T extends JadwalMakanDeleteArgs>(args: SelectSubset<T, JadwalMakanDeleteArgs<ExtArgs>>): Prisma__JadwalMakanClient<$Result.GetResult<Prisma.$JadwalMakanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one JadwalMakan.
     * @param {JadwalMakanUpdateArgs} args - Arguments to update one JadwalMakan.
     * @example
     * // Update one JadwalMakan
     * const jadwalMakan = await prisma.jadwalMakan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JadwalMakanUpdateArgs>(args: SelectSubset<T, JadwalMakanUpdateArgs<ExtArgs>>): Prisma__JadwalMakanClient<$Result.GetResult<Prisma.$JadwalMakanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more JadwalMakans.
     * @param {JadwalMakanDeleteManyArgs} args - Arguments to filter JadwalMakans to delete.
     * @example
     * // Delete a few JadwalMakans
     * const { count } = await prisma.jadwalMakan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JadwalMakanDeleteManyArgs>(args?: SelectSubset<T, JadwalMakanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JadwalMakans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JadwalMakanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JadwalMakans
     * const jadwalMakan = await prisma.jadwalMakan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JadwalMakanUpdateManyArgs>(args: SelectSubset<T, JadwalMakanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JadwalMakans and returns the data updated in the database.
     * @param {JadwalMakanUpdateManyAndReturnArgs} args - Arguments to update many JadwalMakans.
     * @example
     * // Update many JadwalMakans
     * const jadwalMakan = await prisma.jadwalMakan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more JadwalMakans and only return the `id`
     * const jadwalMakanWithIdOnly = await prisma.jadwalMakan.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends JadwalMakanUpdateManyAndReturnArgs>(args: SelectSubset<T, JadwalMakanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JadwalMakanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one JadwalMakan.
     * @param {JadwalMakanUpsertArgs} args - Arguments to update or create a JadwalMakan.
     * @example
     * // Update or create a JadwalMakan
     * const jadwalMakan = await prisma.jadwalMakan.upsert({
     *   create: {
     *     // ... data to create a JadwalMakan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JadwalMakan we want to update
     *   }
     * })
     */
    upsert<T extends JadwalMakanUpsertArgs>(args: SelectSubset<T, JadwalMakanUpsertArgs<ExtArgs>>): Prisma__JadwalMakanClient<$Result.GetResult<Prisma.$JadwalMakanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of JadwalMakans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JadwalMakanCountArgs} args - Arguments to filter JadwalMakans to count.
     * @example
     * // Count the number of JadwalMakans
     * const count = await prisma.jadwalMakan.count({
     *   where: {
     *     // ... the filter for the JadwalMakans we want to count
     *   }
     * })
    **/
    count<T extends JadwalMakanCountArgs>(
      args?: Subset<T, JadwalMakanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JadwalMakanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JadwalMakan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JadwalMakanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JadwalMakanAggregateArgs>(args: Subset<T, JadwalMakanAggregateArgs>): Prisma.PrismaPromise<GetJadwalMakanAggregateType<T>>

    /**
     * Group by JadwalMakan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JadwalMakanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JadwalMakanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JadwalMakanGroupByArgs['orderBy'] }
        : { orderBy?: JadwalMakanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JadwalMakanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJadwalMakanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JadwalMakan model
   */
  readonly fields: JadwalMakanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JadwalMakan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JadwalMakanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sapi<T extends SapiDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SapiDefaultArgs<ExtArgs>>): Prisma__SapiClient<$Result.GetResult<Prisma.$SapiPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    pakan<T extends PakanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PakanDefaultArgs<ExtArgs>>): Prisma__PakanClient<$Result.GetResult<Prisma.$PakanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the JadwalMakan model
   */
  interface JadwalMakanFieldRefs {
    readonly id: FieldRef<"JadwalMakan", 'Int'>
    readonly tanggal: FieldRef<"JadwalMakan", 'DateTime'>
    readonly sapiId: FieldRef<"JadwalMakan", 'Int'>
    readonly pakanId: FieldRef<"JadwalMakan", 'Int'>
    readonly userId: FieldRef<"JadwalMakan", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * JadwalMakan findUnique
   */
  export type JadwalMakanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JadwalMakan
     */
    select?: JadwalMakanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JadwalMakan
     */
    omit?: JadwalMakanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JadwalMakanInclude<ExtArgs> | null
    /**
     * Filter, which JadwalMakan to fetch.
     */
    where: JadwalMakanWhereUniqueInput
  }

  /**
   * JadwalMakan findUniqueOrThrow
   */
  export type JadwalMakanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JadwalMakan
     */
    select?: JadwalMakanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JadwalMakan
     */
    omit?: JadwalMakanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JadwalMakanInclude<ExtArgs> | null
    /**
     * Filter, which JadwalMakan to fetch.
     */
    where: JadwalMakanWhereUniqueInput
  }

  /**
   * JadwalMakan findFirst
   */
  export type JadwalMakanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JadwalMakan
     */
    select?: JadwalMakanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JadwalMakan
     */
    omit?: JadwalMakanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JadwalMakanInclude<ExtArgs> | null
    /**
     * Filter, which JadwalMakan to fetch.
     */
    where?: JadwalMakanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JadwalMakans to fetch.
     */
    orderBy?: JadwalMakanOrderByWithRelationInput | JadwalMakanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JadwalMakans.
     */
    cursor?: JadwalMakanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JadwalMakans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JadwalMakans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JadwalMakans.
     */
    distinct?: JadwalMakanScalarFieldEnum | JadwalMakanScalarFieldEnum[]
  }

  /**
   * JadwalMakan findFirstOrThrow
   */
  export type JadwalMakanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JadwalMakan
     */
    select?: JadwalMakanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JadwalMakan
     */
    omit?: JadwalMakanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JadwalMakanInclude<ExtArgs> | null
    /**
     * Filter, which JadwalMakan to fetch.
     */
    where?: JadwalMakanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JadwalMakans to fetch.
     */
    orderBy?: JadwalMakanOrderByWithRelationInput | JadwalMakanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JadwalMakans.
     */
    cursor?: JadwalMakanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JadwalMakans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JadwalMakans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JadwalMakans.
     */
    distinct?: JadwalMakanScalarFieldEnum | JadwalMakanScalarFieldEnum[]
  }

  /**
   * JadwalMakan findMany
   */
  export type JadwalMakanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JadwalMakan
     */
    select?: JadwalMakanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JadwalMakan
     */
    omit?: JadwalMakanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JadwalMakanInclude<ExtArgs> | null
    /**
     * Filter, which JadwalMakans to fetch.
     */
    where?: JadwalMakanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JadwalMakans to fetch.
     */
    orderBy?: JadwalMakanOrderByWithRelationInput | JadwalMakanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JadwalMakans.
     */
    cursor?: JadwalMakanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JadwalMakans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JadwalMakans.
     */
    skip?: number
    distinct?: JadwalMakanScalarFieldEnum | JadwalMakanScalarFieldEnum[]
  }

  /**
   * JadwalMakan create
   */
  export type JadwalMakanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JadwalMakan
     */
    select?: JadwalMakanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JadwalMakan
     */
    omit?: JadwalMakanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JadwalMakanInclude<ExtArgs> | null
    /**
     * The data needed to create a JadwalMakan.
     */
    data: XOR<JadwalMakanCreateInput, JadwalMakanUncheckedCreateInput>
  }

  /**
   * JadwalMakan createMany
   */
  export type JadwalMakanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many JadwalMakans.
     */
    data: JadwalMakanCreateManyInput | JadwalMakanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JadwalMakan createManyAndReturn
   */
  export type JadwalMakanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JadwalMakan
     */
    select?: JadwalMakanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JadwalMakan
     */
    omit?: JadwalMakanOmit<ExtArgs> | null
    /**
     * The data used to create many JadwalMakans.
     */
    data: JadwalMakanCreateManyInput | JadwalMakanCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JadwalMakanIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * JadwalMakan update
   */
  export type JadwalMakanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JadwalMakan
     */
    select?: JadwalMakanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JadwalMakan
     */
    omit?: JadwalMakanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JadwalMakanInclude<ExtArgs> | null
    /**
     * The data needed to update a JadwalMakan.
     */
    data: XOR<JadwalMakanUpdateInput, JadwalMakanUncheckedUpdateInput>
    /**
     * Choose, which JadwalMakan to update.
     */
    where: JadwalMakanWhereUniqueInput
  }

  /**
   * JadwalMakan updateMany
   */
  export type JadwalMakanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update JadwalMakans.
     */
    data: XOR<JadwalMakanUpdateManyMutationInput, JadwalMakanUncheckedUpdateManyInput>
    /**
     * Filter which JadwalMakans to update
     */
    where?: JadwalMakanWhereInput
    /**
     * Limit how many JadwalMakans to update.
     */
    limit?: number
  }

  /**
   * JadwalMakan updateManyAndReturn
   */
  export type JadwalMakanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JadwalMakan
     */
    select?: JadwalMakanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JadwalMakan
     */
    omit?: JadwalMakanOmit<ExtArgs> | null
    /**
     * The data used to update JadwalMakans.
     */
    data: XOR<JadwalMakanUpdateManyMutationInput, JadwalMakanUncheckedUpdateManyInput>
    /**
     * Filter which JadwalMakans to update
     */
    where?: JadwalMakanWhereInput
    /**
     * Limit how many JadwalMakans to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JadwalMakanIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * JadwalMakan upsert
   */
  export type JadwalMakanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JadwalMakan
     */
    select?: JadwalMakanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JadwalMakan
     */
    omit?: JadwalMakanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JadwalMakanInclude<ExtArgs> | null
    /**
     * The filter to search for the JadwalMakan to update in case it exists.
     */
    where: JadwalMakanWhereUniqueInput
    /**
     * In case the JadwalMakan found by the `where` argument doesn't exist, create a new JadwalMakan with this data.
     */
    create: XOR<JadwalMakanCreateInput, JadwalMakanUncheckedCreateInput>
    /**
     * In case the JadwalMakan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JadwalMakanUpdateInput, JadwalMakanUncheckedUpdateInput>
  }

  /**
   * JadwalMakan delete
   */
  export type JadwalMakanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JadwalMakan
     */
    select?: JadwalMakanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JadwalMakan
     */
    omit?: JadwalMakanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JadwalMakanInclude<ExtArgs> | null
    /**
     * Filter which JadwalMakan to delete.
     */
    where: JadwalMakanWhereUniqueInput
  }

  /**
   * JadwalMakan deleteMany
   */
  export type JadwalMakanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JadwalMakans to delete
     */
    where?: JadwalMakanWhereInput
    /**
     * Limit how many JadwalMakans to delete.
     */
    limit?: number
  }

  /**
   * JadwalMakan without action
   */
  export type JadwalMakanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JadwalMakan
     */
    select?: JadwalMakanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the JadwalMakan
     */
    omit?: JadwalMakanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JadwalMakanInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    nama: 'nama'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SapiScalarFieldEnum: {
    id: 'id',
    jenis: 'jenis',
    bobot: 'bobot',
    image: 'image',
    tanggalLahir: 'tanggalLahir',
    tanggalKematian: 'tanggalKematian'
  };

  export type SapiScalarFieldEnum = (typeof SapiScalarFieldEnum)[keyof typeof SapiScalarFieldEnum]


  export const PakanScalarFieldEnum: {
    id: 'id',
    jenis: 'jenis',
    banyakStok: 'banyakStok',
    harga: 'harga',
    image: 'image'
  };

  export type PakanScalarFieldEnum = (typeof PakanScalarFieldEnum)[keyof typeof PakanScalarFieldEnum]


  export const JadwalMakanScalarFieldEnum: {
    id: 'id',
    tanggal: 'tanggal',
    sapiId: 'sapiId',
    pakanId: 'pakanId',
    userId: 'userId'
  };

  export type JadwalMakanScalarFieldEnum = (typeof JadwalMakanScalarFieldEnum)[keyof typeof JadwalMakanScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    nama?: StringFilter<"User"> | string
    jadwal?: JadwalMakanListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    nama?: SortOrder
    jadwal?: JadwalMakanOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    email?: StringFilter<"User"> | string
    nama?: StringFilter<"User"> | string
    jadwal?: JadwalMakanListRelationFilter
  }, "id">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    nama?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    nama?: StringWithAggregatesFilter<"User"> | string
  }

  export type SapiWhereInput = {
    AND?: SapiWhereInput | SapiWhereInput[]
    OR?: SapiWhereInput[]
    NOT?: SapiWhereInput | SapiWhereInput[]
    id?: IntFilter<"Sapi"> | number
    jenis?: StringFilter<"Sapi"> | string
    bobot?: FloatFilter<"Sapi"> | number
    image?: StringFilter<"Sapi"> | string
    tanggalLahir?: DateTimeFilter<"Sapi"> | Date | string
    tanggalKematian?: DateTimeNullableFilter<"Sapi"> | Date | string | null
    jadwal?: JadwalMakanListRelationFilter
  }

  export type SapiOrderByWithRelationInput = {
    id?: SortOrder
    jenis?: SortOrder
    bobot?: SortOrder
    image?: SortOrder
    tanggalLahir?: SortOrder
    tanggalKematian?: SortOrderInput | SortOrder
    jadwal?: JadwalMakanOrderByRelationAggregateInput
  }

  export type SapiWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SapiWhereInput | SapiWhereInput[]
    OR?: SapiWhereInput[]
    NOT?: SapiWhereInput | SapiWhereInput[]
    jenis?: StringFilter<"Sapi"> | string
    bobot?: FloatFilter<"Sapi"> | number
    image?: StringFilter<"Sapi"> | string
    tanggalLahir?: DateTimeFilter<"Sapi"> | Date | string
    tanggalKematian?: DateTimeNullableFilter<"Sapi"> | Date | string | null
    jadwal?: JadwalMakanListRelationFilter
  }, "id">

  export type SapiOrderByWithAggregationInput = {
    id?: SortOrder
    jenis?: SortOrder
    bobot?: SortOrder
    image?: SortOrder
    tanggalLahir?: SortOrder
    tanggalKematian?: SortOrderInput | SortOrder
    _count?: SapiCountOrderByAggregateInput
    _avg?: SapiAvgOrderByAggregateInput
    _max?: SapiMaxOrderByAggregateInput
    _min?: SapiMinOrderByAggregateInput
    _sum?: SapiSumOrderByAggregateInput
  }

  export type SapiScalarWhereWithAggregatesInput = {
    AND?: SapiScalarWhereWithAggregatesInput | SapiScalarWhereWithAggregatesInput[]
    OR?: SapiScalarWhereWithAggregatesInput[]
    NOT?: SapiScalarWhereWithAggregatesInput | SapiScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Sapi"> | number
    jenis?: StringWithAggregatesFilter<"Sapi"> | string
    bobot?: FloatWithAggregatesFilter<"Sapi"> | number
    image?: StringWithAggregatesFilter<"Sapi"> | string
    tanggalLahir?: DateTimeWithAggregatesFilter<"Sapi"> | Date | string
    tanggalKematian?: DateTimeNullableWithAggregatesFilter<"Sapi"> | Date | string | null
  }

  export type PakanWhereInput = {
    AND?: PakanWhereInput | PakanWhereInput[]
    OR?: PakanWhereInput[]
    NOT?: PakanWhereInput | PakanWhereInput[]
    id?: IntFilter<"Pakan"> | number
    jenis?: StringFilter<"Pakan"> | string
    banyakStok?: FloatFilter<"Pakan"> | number
    harga?: FloatNullableFilter<"Pakan"> | number | null
    image?: StringFilter<"Pakan"> | string
    jadwal?: JadwalMakanListRelationFilter
  }

  export type PakanOrderByWithRelationInput = {
    id?: SortOrder
    jenis?: SortOrder
    banyakStok?: SortOrder
    harga?: SortOrderInput | SortOrder
    image?: SortOrder
    jadwal?: JadwalMakanOrderByRelationAggregateInput
  }

  export type PakanWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PakanWhereInput | PakanWhereInput[]
    OR?: PakanWhereInput[]
    NOT?: PakanWhereInput | PakanWhereInput[]
    jenis?: StringFilter<"Pakan"> | string
    banyakStok?: FloatFilter<"Pakan"> | number
    harga?: FloatNullableFilter<"Pakan"> | number | null
    image?: StringFilter<"Pakan"> | string
    jadwal?: JadwalMakanListRelationFilter
  }, "id">

  export type PakanOrderByWithAggregationInput = {
    id?: SortOrder
    jenis?: SortOrder
    banyakStok?: SortOrder
    harga?: SortOrderInput | SortOrder
    image?: SortOrder
    _count?: PakanCountOrderByAggregateInput
    _avg?: PakanAvgOrderByAggregateInput
    _max?: PakanMaxOrderByAggregateInput
    _min?: PakanMinOrderByAggregateInput
    _sum?: PakanSumOrderByAggregateInput
  }

  export type PakanScalarWhereWithAggregatesInput = {
    AND?: PakanScalarWhereWithAggregatesInput | PakanScalarWhereWithAggregatesInput[]
    OR?: PakanScalarWhereWithAggregatesInput[]
    NOT?: PakanScalarWhereWithAggregatesInput | PakanScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Pakan"> | number
    jenis?: StringWithAggregatesFilter<"Pakan"> | string
    banyakStok?: FloatWithAggregatesFilter<"Pakan"> | number
    harga?: FloatNullableWithAggregatesFilter<"Pakan"> | number | null
    image?: StringWithAggregatesFilter<"Pakan"> | string
  }

  export type JadwalMakanWhereInput = {
    AND?: JadwalMakanWhereInput | JadwalMakanWhereInput[]
    OR?: JadwalMakanWhereInput[]
    NOT?: JadwalMakanWhereInput | JadwalMakanWhereInput[]
    id?: IntFilter<"JadwalMakan"> | number
    tanggal?: DateTimeFilter<"JadwalMakan"> | Date | string
    sapiId?: IntFilter<"JadwalMakan"> | number
    pakanId?: IntFilter<"JadwalMakan"> | number
    userId?: IntFilter<"JadwalMakan"> | number
    sapi?: XOR<SapiScalarRelationFilter, SapiWhereInput>
    pakan?: XOR<PakanScalarRelationFilter, PakanWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type JadwalMakanOrderByWithRelationInput = {
    id?: SortOrder
    tanggal?: SortOrder
    sapiId?: SortOrder
    pakanId?: SortOrder
    userId?: SortOrder
    sapi?: SapiOrderByWithRelationInput
    pakan?: PakanOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type JadwalMakanWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: JadwalMakanWhereInput | JadwalMakanWhereInput[]
    OR?: JadwalMakanWhereInput[]
    NOT?: JadwalMakanWhereInput | JadwalMakanWhereInput[]
    tanggal?: DateTimeFilter<"JadwalMakan"> | Date | string
    sapiId?: IntFilter<"JadwalMakan"> | number
    pakanId?: IntFilter<"JadwalMakan"> | number
    userId?: IntFilter<"JadwalMakan"> | number
    sapi?: XOR<SapiScalarRelationFilter, SapiWhereInput>
    pakan?: XOR<PakanScalarRelationFilter, PakanWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type JadwalMakanOrderByWithAggregationInput = {
    id?: SortOrder
    tanggal?: SortOrder
    sapiId?: SortOrder
    pakanId?: SortOrder
    userId?: SortOrder
    _count?: JadwalMakanCountOrderByAggregateInput
    _avg?: JadwalMakanAvgOrderByAggregateInput
    _max?: JadwalMakanMaxOrderByAggregateInput
    _min?: JadwalMakanMinOrderByAggregateInput
    _sum?: JadwalMakanSumOrderByAggregateInput
  }

  export type JadwalMakanScalarWhereWithAggregatesInput = {
    AND?: JadwalMakanScalarWhereWithAggregatesInput | JadwalMakanScalarWhereWithAggregatesInput[]
    OR?: JadwalMakanScalarWhereWithAggregatesInput[]
    NOT?: JadwalMakanScalarWhereWithAggregatesInput | JadwalMakanScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"JadwalMakan"> | number
    tanggal?: DateTimeWithAggregatesFilter<"JadwalMakan"> | Date | string
    sapiId?: IntWithAggregatesFilter<"JadwalMakan"> | number
    pakanId?: IntWithAggregatesFilter<"JadwalMakan"> | number
    userId?: IntWithAggregatesFilter<"JadwalMakan"> | number
  }

  export type UserCreateInput = {
    email: string
    nama: string
    jadwal?: JadwalMakanCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    nama: string
    jadwal?: JadwalMakanUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    jadwal?: JadwalMakanUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    jadwal?: JadwalMakanUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    nama: string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
  }

  export type SapiCreateInput = {
    jenis: string
    bobot: number
    image: string
    tanggalLahir: Date | string
    tanggalKematian?: Date | string | null
    jadwal?: JadwalMakanCreateNestedManyWithoutSapiInput
  }

  export type SapiUncheckedCreateInput = {
    id?: number
    jenis: string
    bobot: number
    image: string
    tanggalLahir: Date | string
    tanggalKematian?: Date | string | null
    jadwal?: JadwalMakanUncheckedCreateNestedManyWithoutSapiInput
  }

  export type SapiUpdateInput = {
    jenis?: StringFieldUpdateOperationsInput | string
    bobot?: FloatFieldUpdateOperationsInput | number
    image?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggalKematian?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jadwal?: JadwalMakanUpdateManyWithoutSapiNestedInput
  }

  export type SapiUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    jenis?: StringFieldUpdateOperationsInput | string
    bobot?: FloatFieldUpdateOperationsInput | number
    image?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggalKematian?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jadwal?: JadwalMakanUncheckedUpdateManyWithoutSapiNestedInput
  }

  export type SapiCreateManyInput = {
    id?: number
    jenis: string
    bobot: number
    image: string
    tanggalLahir: Date | string
    tanggalKematian?: Date | string | null
  }

  export type SapiUpdateManyMutationInput = {
    jenis?: StringFieldUpdateOperationsInput | string
    bobot?: FloatFieldUpdateOperationsInput | number
    image?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggalKematian?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SapiUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    jenis?: StringFieldUpdateOperationsInput | string
    bobot?: FloatFieldUpdateOperationsInput | number
    image?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggalKematian?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PakanCreateInput = {
    jenis: string
    banyakStok: number
    harga?: number | null
    image: string
    jadwal?: JadwalMakanCreateNestedManyWithoutPakanInput
  }

  export type PakanUncheckedCreateInput = {
    id?: number
    jenis: string
    banyakStok: number
    harga?: number | null
    image: string
    jadwal?: JadwalMakanUncheckedCreateNestedManyWithoutPakanInput
  }

  export type PakanUpdateInput = {
    jenis?: StringFieldUpdateOperationsInput | string
    banyakStok?: FloatFieldUpdateOperationsInput | number
    harga?: NullableFloatFieldUpdateOperationsInput | number | null
    image?: StringFieldUpdateOperationsInput | string
    jadwal?: JadwalMakanUpdateManyWithoutPakanNestedInput
  }

  export type PakanUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    jenis?: StringFieldUpdateOperationsInput | string
    banyakStok?: FloatFieldUpdateOperationsInput | number
    harga?: NullableFloatFieldUpdateOperationsInput | number | null
    image?: StringFieldUpdateOperationsInput | string
    jadwal?: JadwalMakanUncheckedUpdateManyWithoutPakanNestedInput
  }

  export type PakanCreateManyInput = {
    id?: number
    jenis: string
    banyakStok: number
    harga?: number | null
    image: string
  }

  export type PakanUpdateManyMutationInput = {
    jenis?: StringFieldUpdateOperationsInput | string
    banyakStok?: FloatFieldUpdateOperationsInput | number
    harga?: NullableFloatFieldUpdateOperationsInput | number | null
    image?: StringFieldUpdateOperationsInput | string
  }

  export type PakanUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    jenis?: StringFieldUpdateOperationsInput | string
    banyakStok?: FloatFieldUpdateOperationsInput | number
    harga?: NullableFloatFieldUpdateOperationsInput | number | null
    image?: StringFieldUpdateOperationsInput | string
  }

  export type JadwalMakanCreateInput = {
    tanggal: Date | string
    sapi: SapiCreateNestedOneWithoutJadwalInput
    pakan: PakanCreateNestedOneWithoutJadwalInput
    user: UserCreateNestedOneWithoutJadwalInput
  }

  export type JadwalMakanUncheckedCreateInput = {
    id?: number
    tanggal: Date | string
    sapiId: number
    pakanId: number
    userId: number
  }

  export type JadwalMakanUpdateInput = {
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    sapi?: SapiUpdateOneRequiredWithoutJadwalNestedInput
    pakan?: PakanUpdateOneRequiredWithoutJadwalNestedInput
    user?: UserUpdateOneRequiredWithoutJadwalNestedInput
  }

  export type JadwalMakanUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    sapiId?: IntFieldUpdateOperationsInput | number
    pakanId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type JadwalMakanCreateManyInput = {
    id?: number
    tanggal: Date | string
    sapiId: number
    pakanId: number
    userId: number
  }

  export type JadwalMakanUpdateManyMutationInput = {
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JadwalMakanUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    sapiId?: IntFieldUpdateOperationsInput | number
    pakanId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type JadwalMakanListRelationFilter = {
    every?: JadwalMakanWhereInput
    some?: JadwalMakanWhereInput
    none?: JadwalMakanWhereInput
  }

  export type JadwalMakanOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    nama?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    nama?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    nama?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SapiCountOrderByAggregateInput = {
    id?: SortOrder
    jenis?: SortOrder
    bobot?: SortOrder
    image?: SortOrder
    tanggalLahir?: SortOrder
    tanggalKematian?: SortOrder
  }

  export type SapiAvgOrderByAggregateInput = {
    id?: SortOrder
    bobot?: SortOrder
  }

  export type SapiMaxOrderByAggregateInput = {
    id?: SortOrder
    jenis?: SortOrder
    bobot?: SortOrder
    image?: SortOrder
    tanggalLahir?: SortOrder
    tanggalKematian?: SortOrder
  }

  export type SapiMinOrderByAggregateInput = {
    id?: SortOrder
    jenis?: SortOrder
    bobot?: SortOrder
    image?: SortOrder
    tanggalLahir?: SortOrder
    tanggalKematian?: SortOrder
  }

  export type SapiSumOrderByAggregateInput = {
    id?: SortOrder
    bobot?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type PakanCountOrderByAggregateInput = {
    id?: SortOrder
    jenis?: SortOrder
    banyakStok?: SortOrder
    harga?: SortOrder
    image?: SortOrder
  }

  export type PakanAvgOrderByAggregateInput = {
    id?: SortOrder
    banyakStok?: SortOrder
    harga?: SortOrder
  }

  export type PakanMaxOrderByAggregateInput = {
    id?: SortOrder
    jenis?: SortOrder
    banyakStok?: SortOrder
    harga?: SortOrder
    image?: SortOrder
  }

  export type PakanMinOrderByAggregateInput = {
    id?: SortOrder
    jenis?: SortOrder
    banyakStok?: SortOrder
    harga?: SortOrder
    image?: SortOrder
  }

  export type PakanSumOrderByAggregateInput = {
    id?: SortOrder
    banyakStok?: SortOrder
    harga?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type SapiScalarRelationFilter = {
    is?: SapiWhereInput
    isNot?: SapiWhereInput
  }

  export type PakanScalarRelationFilter = {
    is?: PakanWhereInput
    isNot?: PakanWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type JadwalMakanCountOrderByAggregateInput = {
    id?: SortOrder
    tanggal?: SortOrder
    sapiId?: SortOrder
    pakanId?: SortOrder
    userId?: SortOrder
  }

  export type JadwalMakanAvgOrderByAggregateInput = {
    id?: SortOrder
    sapiId?: SortOrder
    pakanId?: SortOrder
    userId?: SortOrder
  }

  export type JadwalMakanMaxOrderByAggregateInput = {
    id?: SortOrder
    tanggal?: SortOrder
    sapiId?: SortOrder
    pakanId?: SortOrder
    userId?: SortOrder
  }

  export type JadwalMakanMinOrderByAggregateInput = {
    id?: SortOrder
    tanggal?: SortOrder
    sapiId?: SortOrder
    pakanId?: SortOrder
    userId?: SortOrder
  }

  export type JadwalMakanSumOrderByAggregateInput = {
    id?: SortOrder
    sapiId?: SortOrder
    pakanId?: SortOrder
    userId?: SortOrder
  }

  export type JadwalMakanCreateNestedManyWithoutUserInput = {
    create?: XOR<JadwalMakanCreateWithoutUserInput, JadwalMakanUncheckedCreateWithoutUserInput> | JadwalMakanCreateWithoutUserInput[] | JadwalMakanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: JadwalMakanCreateOrConnectWithoutUserInput | JadwalMakanCreateOrConnectWithoutUserInput[]
    createMany?: JadwalMakanCreateManyUserInputEnvelope
    connect?: JadwalMakanWhereUniqueInput | JadwalMakanWhereUniqueInput[]
  }

  export type JadwalMakanUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<JadwalMakanCreateWithoutUserInput, JadwalMakanUncheckedCreateWithoutUserInput> | JadwalMakanCreateWithoutUserInput[] | JadwalMakanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: JadwalMakanCreateOrConnectWithoutUserInput | JadwalMakanCreateOrConnectWithoutUserInput[]
    createMany?: JadwalMakanCreateManyUserInputEnvelope
    connect?: JadwalMakanWhereUniqueInput | JadwalMakanWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type JadwalMakanUpdateManyWithoutUserNestedInput = {
    create?: XOR<JadwalMakanCreateWithoutUserInput, JadwalMakanUncheckedCreateWithoutUserInput> | JadwalMakanCreateWithoutUserInput[] | JadwalMakanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: JadwalMakanCreateOrConnectWithoutUserInput | JadwalMakanCreateOrConnectWithoutUserInput[]
    upsert?: JadwalMakanUpsertWithWhereUniqueWithoutUserInput | JadwalMakanUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: JadwalMakanCreateManyUserInputEnvelope
    set?: JadwalMakanWhereUniqueInput | JadwalMakanWhereUniqueInput[]
    disconnect?: JadwalMakanWhereUniqueInput | JadwalMakanWhereUniqueInput[]
    delete?: JadwalMakanWhereUniqueInput | JadwalMakanWhereUniqueInput[]
    connect?: JadwalMakanWhereUniqueInput | JadwalMakanWhereUniqueInput[]
    update?: JadwalMakanUpdateWithWhereUniqueWithoutUserInput | JadwalMakanUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: JadwalMakanUpdateManyWithWhereWithoutUserInput | JadwalMakanUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: JadwalMakanScalarWhereInput | JadwalMakanScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type JadwalMakanUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<JadwalMakanCreateWithoutUserInput, JadwalMakanUncheckedCreateWithoutUserInput> | JadwalMakanCreateWithoutUserInput[] | JadwalMakanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: JadwalMakanCreateOrConnectWithoutUserInput | JadwalMakanCreateOrConnectWithoutUserInput[]
    upsert?: JadwalMakanUpsertWithWhereUniqueWithoutUserInput | JadwalMakanUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: JadwalMakanCreateManyUserInputEnvelope
    set?: JadwalMakanWhereUniqueInput | JadwalMakanWhereUniqueInput[]
    disconnect?: JadwalMakanWhereUniqueInput | JadwalMakanWhereUniqueInput[]
    delete?: JadwalMakanWhereUniqueInput | JadwalMakanWhereUniqueInput[]
    connect?: JadwalMakanWhereUniqueInput | JadwalMakanWhereUniqueInput[]
    update?: JadwalMakanUpdateWithWhereUniqueWithoutUserInput | JadwalMakanUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: JadwalMakanUpdateManyWithWhereWithoutUserInput | JadwalMakanUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: JadwalMakanScalarWhereInput | JadwalMakanScalarWhereInput[]
  }

  export type JadwalMakanCreateNestedManyWithoutSapiInput = {
    create?: XOR<JadwalMakanCreateWithoutSapiInput, JadwalMakanUncheckedCreateWithoutSapiInput> | JadwalMakanCreateWithoutSapiInput[] | JadwalMakanUncheckedCreateWithoutSapiInput[]
    connectOrCreate?: JadwalMakanCreateOrConnectWithoutSapiInput | JadwalMakanCreateOrConnectWithoutSapiInput[]
    createMany?: JadwalMakanCreateManySapiInputEnvelope
    connect?: JadwalMakanWhereUniqueInput | JadwalMakanWhereUniqueInput[]
  }

  export type JadwalMakanUncheckedCreateNestedManyWithoutSapiInput = {
    create?: XOR<JadwalMakanCreateWithoutSapiInput, JadwalMakanUncheckedCreateWithoutSapiInput> | JadwalMakanCreateWithoutSapiInput[] | JadwalMakanUncheckedCreateWithoutSapiInput[]
    connectOrCreate?: JadwalMakanCreateOrConnectWithoutSapiInput | JadwalMakanCreateOrConnectWithoutSapiInput[]
    createMany?: JadwalMakanCreateManySapiInputEnvelope
    connect?: JadwalMakanWhereUniqueInput | JadwalMakanWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type JadwalMakanUpdateManyWithoutSapiNestedInput = {
    create?: XOR<JadwalMakanCreateWithoutSapiInput, JadwalMakanUncheckedCreateWithoutSapiInput> | JadwalMakanCreateWithoutSapiInput[] | JadwalMakanUncheckedCreateWithoutSapiInput[]
    connectOrCreate?: JadwalMakanCreateOrConnectWithoutSapiInput | JadwalMakanCreateOrConnectWithoutSapiInput[]
    upsert?: JadwalMakanUpsertWithWhereUniqueWithoutSapiInput | JadwalMakanUpsertWithWhereUniqueWithoutSapiInput[]
    createMany?: JadwalMakanCreateManySapiInputEnvelope
    set?: JadwalMakanWhereUniqueInput | JadwalMakanWhereUniqueInput[]
    disconnect?: JadwalMakanWhereUniqueInput | JadwalMakanWhereUniqueInput[]
    delete?: JadwalMakanWhereUniqueInput | JadwalMakanWhereUniqueInput[]
    connect?: JadwalMakanWhereUniqueInput | JadwalMakanWhereUniqueInput[]
    update?: JadwalMakanUpdateWithWhereUniqueWithoutSapiInput | JadwalMakanUpdateWithWhereUniqueWithoutSapiInput[]
    updateMany?: JadwalMakanUpdateManyWithWhereWithoutSapiInput | JadwalMakanUpdateManyWithWhereWithoutSapiInput[]
    deleteMany?: JadwalMakanScalarWhereInput | JadwalMakanScalarWhereInput[]
  }

  export type JadwalMakanUncheckedUpdateManyWithoutSapiNestedInput = {
    create?: XOR<JadwalMakanCreateWithoutSapiInput, JadwalMakanUncheckedCreateWithoutSapiInput> | JadwalMakanCreateWithoutSapiInput[] | JadwalMakanUncheckedCreateWithoutSapiInput[]
    connectOrCreate?: JadwalMakanCreateOrConnectWithoutSapiInput | JadwalMakanCreateOrConnectWithoutSapiInput[]
    upsert?: JadwalMakanUpsertWithWhereUniqueWithoutSapiInput | JadwalMakanUpsertWithWhereUniqueWithoutSapiInput[]
    createMany?: JadwalMakanCreateManySapiInputEnvelope
    set?: JadwalMakanWhereUniqueInput | JadwalMakanWhereUniqueInput[]
    disconnect?: JadwalMakanWhereUniqueInput | JadwalMakanWhereUniqueInput[]
    delete?: JadwalMakanWhereUniqueInput | JadwalMakanWhereUniqueInput[]
    connect?: JadwalMakanWhereUniqueInput | JadwalMakanWhereUniqueInput[]
    update?: JadwalMakanUpdateWithWhereUniqueWithoutSapiInput | JadwalMakanUpdateWithWhereUniqueWithoutSapiInput[]
    updateMany?: JadwalMakanUpdateManyWithWhereWithoutSapiInput | JadwalMakanUpdateManyWithWhereWithoutSapiInput[]
    deleteMany?: JadwalMakanScalarWhereInput | JadwalMakanScalarWhereInput[]
  }

  export type JadwalMakanCreateNestedManyWithoutPakanInput = {
    create?: XOR<JadwalMakanCreateWithoutPakanInput, JadwalMakanUncheckedCreateWithoutPakanInput> | JadwalMakanCreateWithoutPakanInput[] | JadwalMakanUncheckedCreateWithoutPakanInput[]
    connectOrCreate?: JadwalMakanCreateOrConnectWithoutPakanInput | JadwalMakanCreateOrConnectWithoutPakanInput[]
    createMany?: JadwalMakanCreateManyPakanInputEnvelope
    connect?: JadwalMakanWhereUniqueInput | JadwalMakanWhereUniqueInput[]
  }

  export type JadwalMakanUncheckedCreateNestedManyWithoutPakanInput = {
    create?: XOR<JadwalMakanCreateWithoutPakanInput, JadwalMakanUncheckedCreateWithoutPakanInput> | JadwalMakanCreateWithoutPakanInput[] | JadwalMakanUncheckedCreateWithoutPakanInput[]
    connectOrCreate?: JadwalMakanCreateOrConnectWithoutPakanInput | JadwalMakanCreateOrConnectWithoutPakanInput[]
    createMany?: JadwalMakanCreateManyPakanInputEnvelope
    connect?: JadwalMakanWhereUniqueInput | JadwalMakanWhereUniqueInput[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type JadwalMakanUpdateManyWithoutPakanNestedInput = {
    create?: XOR<JadwalMakanCreateWithoutPakanInput, JadwalMakanUncheckedCreateWithoutPakanInput> | JadwalMakanCreateWithoutPakanInput[] | JadwalMakanUncheckedCreateWithoutPakanInput[]
    connectOrCreate?: JadwalMakanCreateOrConnectWithoutPakanInput | JadwalMakanCreateOrConnectWithoutPakanInput[]
    upsert?: JadwalMakanUpsertWithWhereUniqueWithoutPakanInput | JadwalMakanUpsertWithWhereUniqueWithoutPakanInput[]
    createMany?: JadwalMakanCreateManyPakanInputEnvelope
    set?: JadwalMakanWhereUniqueInput | JadwalMakanWhereUniqueInput[]
    disconnect?: JadwalMakanWhereUniqueInput | JadwalMakanWhereUniqueInput[]
    delete?: JadwalMakanWhereUniqueInput | JadwalMakanWhereUniqueInput[]
    connect?: JadwalMakanWhereUniqueInput | JadwalMakanWhereUniqueInput[]
    update?: JadwalMakanUpdateWithWhereUniqueWithoutPakanInput | JadwalMakanUpdateWithWhereUniqueWithoutPakanInput[]
    updateMany?: JadwalMakanUpdateManyWithWhereWithoutPakanInput | JadwalMakanUpdateManyWithWhereWithoutPakanInput[]
    deleteMany?: JadwalMakanScalarWhereInput | JadwalMakanScalarWhereInput[]
  }

  export type JadwalMakanUncheckedUpdateManyWithoutPakanNestedInput = {
    create?: XOR<JadwalMakanCreateWithoutPakanInput, JadwalMakanUncheckedCreateWithoutPakanInput> | JadwalMakanCreateWithoutPakanInput[] | JadwalMakanUncheckedCreateWithoutPakanInput[]
    connectOrCreate?: JadwalMakanCreateOrConnectWithoutPakanInput | JadwalMakanCreateOrConnectWithoutPakanInput[]
    upsert?: JadwalMakanUpsertWithWhereUniqueWithoutPakanInput | JadwalMakanUpsertWithWhereUniqueWithoutPakanInput[]
    createMany?: JadwalMakanCreateManyPakanInputEnvelope
    set?: JadwalMakanWhereUniqueInput | JadwalMakanWhereUniqueInput[]
    disconnect?: JadwalMakanWhereUniqueInput | JadwalMakanWhereUniqueInput[]
    delete?: JadwalMakanWhereUniqueInput | JadwalMakanWhereUniqueInput[]
    connect?: JadwalMakanWhereUniqueInput | JadwalMakanWhereUniqueInput[]
    update?: JadwalMakanUpdateWithWhereUniqueWithoutPakanInput | JadwalMakanUpdateWithWhereUniqueWithoutPakanInput[]
    updateMany?: JadwalMakanUpdateManyWithWhereWithoutPakanInput | JadwalMakanUpdateManyWithWhereWithoutPakanInput[]
    deleteMany?: JadwalMakanScalarWhereInput | JadwalMakanScalarWhereInput[]
  }

  export type SapiCreateNestedOneWithoutJadwalInput = {
    create?: XOR<SapiCreateWithoutJadwalInput, SapiUncheckedCreateWithoutJadwalInput>
    connectOrCreate?: SapiCreateOrConnectWithoutJadwalInput
    connect?: SapiWhereUniqueInput
  }

  export type PakanCreateNestedOneWithoutJadwalInput = {
    create?: XOR<PakanCreateWithoutJadwalInput, PakanUncheckedCreateWithoutJadwalInput>
    connectOrCreate?: PakanCreateOrConnectWithoutJadwalInput
    connect?: PakanWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutJadwalInput = {
    create?: XOR<UserCreateWithoutJadwalInput, UserUncheckedCreateWithoutJadwalInput>
    connectOrCreate?: UserCreateOrConnectWithoutJadwalInput
    connect?: UserWhereUniqueInput
  }

  export type SapiUpdateOneRequiredWithoutJadwalNestedInput = {
    create?: XOR<SapiCreateWithoutJadwalInput, SapiUncheckedCreateWithoutJadwalInput>
    connectOrCreate?: SapiCreateOrConnectWithoutJadwalInput
    upsert?: SapiUpsertWithoutJadwalInput
    connect?: SapiWhereUniqueInput
    update?: XOR<XOR<SapiUpdateToOneWithWhereWithoutJadwalInput, SapiUpdateWithoutJadwalInput>, SapiUncheckedUpdateWithoutJadwalInput>
  }

  export type PakanUpdateOneRequiredWithoutJadwalNestedInput = {
    create?: XOR<PakanCreateWithoutJadwalInput, PakanUncheckedCreateWithoutJadwalInput>
    connectOrCreate?: PakanCreateOrConnectWithoutJadwalInput
    upsert?: PakanUpsertWithoutJadwalInput
    connect?: PakanWhereUniqueInput
    update?: XOR<XOR<PakanUpdateToOneWithWhereWithoutJadwalInput, PakanUpdateWithoutJadwalInput>, PakanUncheckedUpdateWithoutJadwalInput>
  }

  export type UserUpdateOneRequiredWithoutJadwalNestedInput = {
    create?: XOR<UserCreateWithoutJadwalInput, UserUncheckedCreateWithoutJadwalInput>
    connectOrCreate?: UserCreateOrConnectWithoutJadwalInput
    upsert?: UserUpsertWithoutJadwalInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutJadwalInput, UserUpdateWithoutJadwalInput>, UserUncheckedUpdateWithoutJadwalInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type JadwalMakanCreateWithoutUserInput = {
    tanggal: Date | string
    sapi: SapiCreateNestedOneWithoutJadwalInput
    pakan: PakanCreateNestedOneWithoutJadwalInput
  }

  export type JadwalMakanUncheckedCreateWithoutUserInput = {
    id?: number
    tanggal: Date | string
    sapiId: number
    pakanId: number
  }

  export type JadwalMakanCreateOrConnectWithoutUserInput = {
    where: JadwalMakanWhereUniqueInput
    create: XOR<JadwalMakanCreateWithoutUserInput, JadwalMakanUncheckedCreateWithoutUserInput>
  }

  export type JadwalMakanCreateManyUserInputEnvelope = {
    data: JadwalMakanCreateManyUserInput | JadwalMakanCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type JadwalMakanUpsertWithWhereUniqueWithoutUserInput = {
    where: JadwalMakanWhereUniqueInput
    update: XOR<JadwalMakanUpdateWithoutUserInput, JadwalMakanUncheckedUpdateWithoutUserInput>
    create: XOR<JadwalMakanCreateWithoutUserInput, JadwalMakanUncheckedCreateWithoutUserInput>
  }

  export type JadwalMakanUpdateWithWhereUniqueWithoutUserInput = {
    where: JadwalMakanWhereUniqueInput
    data: XOR<JadwalMakanUpdateWithoutUserInput, JadwalMakanUncheckedUpdateWithoutUserInput>
  }

  export type JadwalMakanUpdateManyWithWhereWithoutUserInput = {
    where: JadwalMakanScalarWhereInput
    data: XOR<JadwalMakanUpdateManyMutationInput, JadwalMakanUncheckedUpdateManyWithoutUserInput>
  }

  export type JadwalMakanScalarWhereInput = {
    AND?: JadwalMakanScalarWhereInput | JadwalMakanScalarWhereInput[]
    OR?: JadwalMakanScalarWhereInput[]
    NOT?: JadwalMakanScalarWhereInput | JadwalMakanScalarWhereInput[]
    id?: IntFilter<"JadwalMakan"> | number
    tanggal?: DateTimeFilter<"JadwalMakan"> | Date | string
    sapiId?: IntFilter<"JadwalMakan"> | number
    pakanId?: IntFilter<"JadwalMakan"> | number
    userId?: IntFilter<"JadwalMakan"> | number
  }

  export type JadwalMakanCreateWithoutSapiInput = {
    tanggal: Date | string
    pakan: PakanCreateNestedOneWithoutJadwalInput
    user: UserCreateNestedOneWithoutJadwalInput
  }

  export type JadwalMakanUncheckedCreateWithoutSapiInput = {
    id?: number
    tanggal: Date | string
    pakanId: number
    userId: number
  }

  export type JadwalMakanCreateOrConnectWithoutSapiInput = {
    where: JadwalMakanWhereUniqueInput
    create: XOR<JadwalMakanCreateWithoutSapiInput, JadwalMakanUncheckedCreateWithoutSapiInput>
  }

  export type JadwalMakanCreateManySapiInputEnvelope = {
    data: JadwalMakanCreateManySapiInput | JadwalMakanCreateManySapiInput[]
    skipDuplicates?: boolean
  }

  export type JadwalMakanUpsertWithWhereUniqueWithoutSapiInput = {
    where: JadwalMakanWhereUniqueInput
    update: XOR<JadwalMakanUpdateWithoutSapiInput, JadwalMakanUncheckedUpdateWithoutSapiInput>
    create: XOR<JadwalMakanCreateWithoutSapiInput, JadwalMakanUncheckedCreateWithoutSapiInput>
  }

  export type JadwalMakanUpdateWithWhereUniqueWithoutSapiInput = {
    where: JadwalMakanWhereUniqueInput
    data: XOR<JadwalMakanUpdateWithoutSapiInput, JadwalMakanUncheckedUpdateWithoutSapiInput>
  }

  export type JadwalMakanUpdateManyWithWhereWithoutSapiInput = {
    where: JadwalMakanScalarWhereInput
    data: XOR<JadwalMakanUpdateManyMutationInput, JadwalMakanUncheckedUpdateManyWithoutSapiInput>
  }

  export type JadwalMakanCreateWithoutPakanInput = {
    tanggal: Date | string
    sapi: SapiCreateNestedOneWithoutJadwalInput
    user: UserCreateNestedOneWithoutJadwalInput
  }

  export type JadwalMakanUncheckedCreateWithoutPakanInput = {
    id?: number
    tanggal: Date | string
    sapiId: number
    userId: number
  }

  export type JadwalMakanCreateOrConnectWithoutPakanInput = {
    where: JadwalMakanWhereUniqueInput
    create: XOR<JadwalMakanCreateWithoutPakanInput, JadwalMakanUncheckedCreateWithoutPakanInput>
  }

  export type JadwalMakanCreateManyPakanInputEnvelope = {
    data: JadwalMakanCreateManyPakanInput | JadwalMakanCreateManyPakanInput[]
    skipDuplicates?: boolean
  }

  export type JadwalMakanUpsertWithWhereUniqueWithoutPakanInput = {
    where: JadwalMakanWhereUniqueInput
    update: XOR<JadwalMakanUpdateWithoutPakanInput, JadwalMakanUncheckedUpdateWithoutPakanInput>
    create: XOR<JadwalMakanCreateWithoutPakanInput, JadwalMakanUncheckedCreateWithoutPakanInput>
  }

  export type JadwalMakanUpdateWithWhereUniqueWithoutPakanInput = {
    where: JadwalMakanWhereUniqueInput
    data: XOR<JadwalMakanUpdateWithoutPakanInput, JadwalMakanUncheckedUpdateWithoutPakanInput>
  }

  export type JadwalMakanUpdateManyWithWhereWithoutPakanInput = {
    where: JadwalMakanScalarWhereInput
    data: XOR<JadwalMakanUpdateManyMutationInput, JadwalMakanUncheckedUpdateManyWithoutPakanInput>
  }

  export type SapiCreateWithoutJadwalInput = {
    jenis: string
    bobot: number
    image: string
    tanggalLahir: Date | string
    tanggalKematian?: Date | string | null
  }

  export type SapiUncheckedCreateWithoutJadwalInput = {
    id?: number
    jenis: string
    bobot: number
    image: string
    tanggalLahir: Date | string
    tanggalKematian?: Date | string | null
  }

  export type SapiCreateOrConnectWithoutJadwalInput = {
    where: SapiWhereUniqueInput
    create: XOR<SapiCreateWithoutJadwalInput, SapiUncheckedCreateWithoutJadwalInput>
  }

  export type PakanCreateWithoutJadwalInput = {
    jenis: string
    banyakStok: number
    harga?: number | null
    image: string
  }

  export type PakanUncheckedCreateWithoutJadwalInput = {
    id?: number
    jenis: string
    banyakStok: number
    harga?: number | null
    image: string
  }

  export type PakanCreateOrConnectWithoutJadwalInput = {
    where: PakanWhereUniqueInput
    create: XOR<PakanCreateWithoutJadwalInput, PakanUncheckedCreateWithoutJadwalInput>
  }

  export type UserCreateWithoutJadwalInput = {
    email: string
    nama: string
  }

  export type UserUncheckedCreateWithoutJadwalInput = {
    id?: number
    email: string
    nama: string
  }

  export type UserCreateOrConnectWithoutJadwalInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutJadwalInput, UserUncheckedCreateWithoutJadwalInput>
  }

  export type SapiUpsertWithoutJadwalInput = {
    update: XOR<SapiUpdateWithoutJadwalInput, SapiUncheckedUpdateWithoutJadwalInput>
    create: XOR<SapiCreateWithoutJadwalInput, SapiUncheckedCreateWithoutJadwalInput>
    where?: SapiWhereInput
  }

  export type SapiUpdateToOneWithWhereWithoutJadwalInput = {
    where?: SapiWhereInput
    data: XOR<SapiUpdateWithoutJadwalInput, SapiUncheckedUpdateWithoutJadwalInput>
  }

  export type SapiUpdateWithoutJadwalInput = {
    jenis?: StringFieldUpdateOperationsInput | string
    bobot?: FloatFieldUpdateOperationsInput | number
    image?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggalKematian?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SapiUncheckedUpdateWithoutJadwalInput = {
    id?: IntFieldUpdateOperationsInput | number
    jenis?: StringFieldUpdateOperationsInput | string
    bobot?: FloatFieldUpdateOperationsInput | number
    image?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: DateTimeFieldUpdateOperationsInput | Date | string
    tanggalKematian?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PakanUpsertWithoutJadwalInput = {
    update: XOR<PakanUpdateWithoutJadwalInput, PakanUncheckedUpdateWithoutJadwalInput>
    create: XOR<PakanCreateWithoutJadwalInput, PakanUncheckedCreateWithoutJadwalInput>
    where?: PakanWhereInput
  }

  export type PakanUpdateToOneWithWhereWithoutJadwalInput = {
    where?: PakanWhereInput
    data: XOR<PakanUpdateWithoutJadwalInput, PakanUncheckedUpdateWithoutJadwalInput>
  }

  export type PakanUpdateWithoutJadwalInput = {
    jenis?: StringFieldUpdateOperationsInput | string
    banyakStok?: FloatFieldUpdateOperationsInput | number
    harga?: NullableFloatFieldUpdateOperationsInput | number | null
    image?: StringFieldUpdateOperationsInput | string
  }

  export type PakanUncheckedUpdateWithoutJadwalInput = {
    id?: IntFieldUpdateOperationsInput | number
    jenis?: StringFieldUpdateOperationsInput | string
    banyakStok?: FloatFieldUpdateOperationsInput | number
    harga?: NullableFloatFieldUpdateOperationsInput | number | null
    image?: StringFieldUpdateOperationsInput | string
  }

  export type UserUpsertWithoutJadwalInput = {
    update: XOR<UserUpdateWithoutJadwalInput, UserUncheckedUpdateWithoutJadwalInput>
    create: XOR<UserCreateWithoutJadwalInput, UserUncheckedCreateWithoutJadwalInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutJadwalInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutJadwalInput, UserUncheckedUpdateWithoutJadwalInput>
  }

  export type UserUpdateWithoutJadwalInput = {
    email?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateWithoutJadwalInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
  }

  export type JadwalMakanCreateManyUserInput = {
    id?: number
    tanggal: Date | string
    sapiId: number
    pakanId: number
  }

  export type JadwalMakanUpdateWithoutUserInput = {
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    sapi?: SapiUpdateOneRequiredWithoutJadwalNestedInput
    pakan?: PakanUpdateOneRequiredWithoutJadwalNestedInput
  }

  export type JadwalMakanUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    sapiId?: IntFieldUpdateOperationsInput | number
    pakanId?: IntFieldUpdateOperationsInput | number
  }

  export type JadwalMakanUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    sapiId?: IntFieldUpdateOperationsInput | number
    pakanId?: IntFieldUpdateOperationsInput | number
  }

  export type JadwalMakanCreateManySapiInput = {
    id?: number
    tanggal: Date | string
    pakanId: number
    userId: number
  }

  export type JadwalMakanUpdateWithoutSapiInput = {
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    pakan?: PakanUpdateOneRequiredWithoutJadwalNestedInput
    user?: UserUpdateOneRequiredWithoutJadwalNestedInput
  }

  export type JadwalMakanUncheckedUpdateWithoutSapiInput = {
    id?: IntFieldUpdateOperationsInput | number
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    pakanId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type JadwalMakanUncheckedUpdateManyWithoutSapiInput = {
    id?: IntFieldUpdateOperationsInput | number
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    pakanId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type JadwalMakanCreateManyPakanInput = {
    id?: number
    tanggal: Date | string
    sapiId: number
    userId: number
  }

  export type JadwalMakanUpdateWithoutPakanInput = {
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    sapi?: SapiUpdateOneRequiredWithoutJadwalNestedInput
    user?: UserUpdateOneRequiredWithoutJadwalNestedInput
  }

  export type JadwalMakanUncheckedUpdateWithoutPakanInput = {
    id?: IntFieldUpdateOperationsInput | number
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    sapiId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type JadwalMakanUncheckedUpdateManyWithoutPakanInput = {
    id?: IntFieldUpdateOperationsInput | number
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    sapiId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}