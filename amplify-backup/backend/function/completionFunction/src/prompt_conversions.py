def corpusA(problem, groupify, cognify):
    prompt = f"I want to {problem.lower()}{'.' if problem[-1] != '.' else ''} Give me an example of {'a' if groupify[0] not in 'aeiou' else 'an'} {groupify} that {'creates solutions for' if cognify == 'create' else f'{cognify}s'} how to do this."
    return prompt