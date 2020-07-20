def gem_query(user_id):
    return (
        f'''
            query {{
                gem(user: "{user_id}") {{
                    gems
                    user {{
                        id
                    }}
                }}
            }}
        '''
    )
