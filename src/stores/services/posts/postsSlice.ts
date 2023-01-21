import {api} from '../api';

export const extendedApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => {
                return {
                    url: 'api/posts'
                }
            },
            providesTags: (result, error, arg) => [
                {type: 'Post', id: 'LIST'},
                ...result.ids.map((id: any) => ({type: 'Post', id}))
            ]
        }),
        addPost: builder.mutation({
            query: (data) => {
                console.log(data)
                return{ 
                    url: `api/posts`,
                    method: 'POST',
                    body: data
                }
            },
            invalidatesTags: [{type: 'Posts', id: 'LIST'}]
        })
    })
})

export const {useGetPostsQuery, useAddPostMutation} = extendedApiSlice;