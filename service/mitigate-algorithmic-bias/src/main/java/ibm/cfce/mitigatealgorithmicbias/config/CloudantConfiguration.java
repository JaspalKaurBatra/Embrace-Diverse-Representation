package ibm.cfce.mitigatealgorithmicbias.config;

import com.cloudant.client.api.ClientBuilder;
import com.cloudant.client.api.CloudantClient;
import com.cloudant.client.api.Database;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(CloudantConfigurationProperties.class)
public class CloudantConfiguration {
	@Autowired
	private CloudantConfigurationProperties config;

	@Bean
	public CloudantClient client() {
		ClientBuilder builder = ClientBuilder
			.url(config.getUrl())
			.username(config.getUsername())
			.password(config.getPassword());
		return builder.build();
	}

	@Bean
	public Database database(CloudantClient client) {
		Database db = client.database(config.getDb(), true);
		return db;
	}
}
