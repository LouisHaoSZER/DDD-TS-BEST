import type { ClassConstructor, IocAdapter } from 'routing-controllers'
import type { DependencyContainer } from 'tsyringe'

class TsyringeAdapter implements IocAdapter {
  constructor(private readonly TsyringeContainer: DependencyContainer) {}

  get<T>(someClass: ClassConstructor<T>): T {
    const childContainer = this.TsyringeContainer.createChildContainer()
    return childContainer.resolve<T>(someClass)
  }
}

export default TsyringeAdapter
