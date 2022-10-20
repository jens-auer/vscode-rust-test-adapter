use std::time::Duration;

use tokio;

use rand::{self, distributions::Uniform, Rng};

pub async fn foo() -> i32 {
    let mut rng = rand::thread_rng();
    let tmax = Duration::from_millis(50);
    let t_dist = Uniform::new_inclusive(Duration::ZERO, tmax);
    let i32_dist = Uniform::new_inclusive(23, 42);

    tokio::time::sleep(rng.sample(t_dist)).await;
    rng.sample(i32_dist)
}

#[cfg(test)]
pub mod tokio_tests {
    use tokio;

    use crate::foo;

    #[tokio::test]
    pub async fn test1() {
        let x = foo().await;

        assert!(x >= 23);
        assert!(x <= 42);
    }
}