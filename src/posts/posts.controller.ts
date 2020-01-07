import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator'
import { InjectModel } from 'nestjs-typegoose';
import { Post as PostSchema } from './post.model'
import { ModelType } from '@hasezoey/typegoose/lib/types';
class CreatePostDto {
    @ApiProperty({ description: '标题', example: 'examoleTitle'})
    @IsNotEmpty({ message: '标题不能为空' })
    title: string

    @ApiProperty({ description: '内容', example: 'examoleContent'})
    content: string
}

@Controller('posts')
@ApiTags('posts接口')
export class PostsController {
    constructor(
        @InjectModel(PostSchema) private readonly postModel: ModelType<PostSchema>
    ){}

    @Get()
    @ApiOperation({ summary: '获取列表' }) //api的描述/注释
    async index(){
        return await this.postModel.find()
    }

    @Post()
    @ApiOperation({ summary: 'item创建' })
    async create(@Body() createPostDto:CreatePostDto){
        await this.postModel.create(createPostDto)
        return {
            success: true
        }
    }
    
    @Get(':id')
    @ApiOperation({ summary: 'item详情' })
    async detail(@Param('id') id:string){
        return await this.postModel.findById(id)
    }

    @Put(':id')
    @ApiOperation({ summary: 'item编辑' })
    // 为了方便body暂时都用了CreatePostDto
    async update(@Param('id') id: string , @Body() updatePostDto:CreatePostDto){
        await this.postModel.findByIdAndUpdate(id, updatePostDto)
        return {
            success: true,
            id: id,
            ...updatePostDto
        }
    }

    @Delete(':id')
    @ApiOperation({ summary: 'item删除' })
    async remove(@Param('id') id: string){
        await this.postModel.findByIdAndDelete(id)
        return {
            success: true
        }
    }
}
