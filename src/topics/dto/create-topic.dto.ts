import { IsString, MaxLength, Min, MinLength } from 'class-validator';

export class CreateTopicDto {

    @IsString()
    @MinLength(3)
    @MaxLength(50)
    name: string;

    @Min(1)
    partitions: number;

    @Min(1)
    replicas: number;
}